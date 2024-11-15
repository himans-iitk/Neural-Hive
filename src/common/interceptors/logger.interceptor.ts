/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: CloudLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        // 正常系のみ。異常系はGlobalExceptionFilterでまとめて処理。
        next: (): void => {
          const ctx = context.switchToHttp();
          const request = ctx.getRequest<Request>();
          const response = ctx.getResponse<Response>();
          const { method, url, uuid } = request;
          const { statusCode } = response;
          this.logger.verbose(
            `[${uuid}] Outgoing response - ${statusCode} - ${method} - ${url}`,
            this.logger.getRequestInfo(request),
          );
        },
      }),
    );
  }
}
