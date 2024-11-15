import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { I18nValidationPipe } from 'nestjs-i18n';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { LoggerInterceptor } from '@/common/interceptors/logger.interceptor';
import { TimestampInterceptor } from '@/common/interceptors/timestamp.interceptor';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';
import { AppModule } from '@/modules/app.module';

export async function bootstrap() {
  // 認証のライブラリ使うにはエンジンがexpressである必要がある.
  // productionではNestJSが自動で出力するloggerをオフにする.
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    process.env.NODE_ENV === 'production' ? { logger: false } : {},
  );

  // URLにapiを含める.
  app.setGlobalPrefix('api');

  // CORS対策.
  app.enableCors({
    origin: process.env.ORIGIN?.split(','),
    methods: 'GET, POST, OPTIONS',
    allowedHeaders:
      'Origin, Content-Type, Language, X-Authorization, Authorization, Version',
    maxAge: 86400, // プリフライトのレスポンス結果をブラウザへキャッシュしてよい時間(秒)、24時間を設定.
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });

  // グローバルで使用する機能を定義.
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(CloudLoggerService)));
  // guardはバインドされた順に実行されるのでJWTが最優先.
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalInterceptors(
    new LoggerInterceptor(app.get(CloudLoggerService)),
    new TimeoutInterceptor(),
    new TimestampInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  // ValidationPipeにtransformOptions: { enableImplicitConversion: true }をつけると全体的に暗黙的型変換されるが非推奨.
  // dtoで必要に応じて@Type(() => 型)で変換する、変換しないとすべて文字列になる.
  app.useGlobalPipes(
    new I18nValidationPipe(),
    new ValidationPipe({
      transform: true,
      // class-validator, CVE-2019-18413の対応
      // https://github.com/nestjs/nest/issues/8562
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
    }),
  );

  // Lifecycle Events OnApplicationShutdownを有効化.
  app.enableShutdownHooks();

  // レスポンスヘッダーからX-Powered-By, ETagを削除.
  app.disable('x-powered-by');
  app.disable('etag');

  // Request Bodyをパースする際のlimitを設定（デフォルト100KBのため配信先が数万人のリクエストが受け取れないため）
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // セキュリティ対策.
  app.use(helmet());

  // Production環境以外ではOpenAPIを建てる
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // 環境変数PORTはCloud Runのコンテナポート
  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
