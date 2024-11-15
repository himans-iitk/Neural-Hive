import * as path from 'path';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, I18nYamlLoader, HeaderResolver } from 'nestjs-i18n';
import { ApplicationStatusModule } from './application-status/application-status.module';
import { MatchingResultModule } from './matching-result/matching-result.module';
import { ResearcherModule } from './researcher/researcher.module';
import { UserInfoModule } from './user-info/user-info.module';
import { CorsMiddleware } from '@/common/middleware/cors.middleware';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { UserEmailMiddleware } from '@/common/middleware/user-email.middleware';
import { GlobalModule } from '@/modules/global.module';
import { OfferModule } from '@/modules/offer/offer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    OfferModule,
    UserInfoModule,
    MatchingResultModule,
    ResearcherModule,
    ApplicationStatusModule,
    I18nModule.forRoot({
      fallbackLanguage: 'ja',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-custom-lang'])],
      loader: I18nYamlLoader,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, CorsMiddleware, UserEmailMiddleware)
      .forRoutes('*');
  }
}
