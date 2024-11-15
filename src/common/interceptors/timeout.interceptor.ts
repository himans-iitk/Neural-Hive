/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ServiceUnavailableException,
  HttpException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // タイムアウトはLB30秒、Run28秒にしてNodeは25秒にする.
      timeout(Number(process.env.TIMEOUT_MS) || 25000),
      catchError(err => {
        // タイムアウト系のエラーは504にする
        if (err?.message?.includes('Timeout')) {
          throw new GatewayTimeoutException(err);
        }
        // 503エラー
        if (err instanceof HttpException && err.getStatus() === 503) {
          return throwError(() => new ServiceUnavailableException());
        }
        return throwError(() => err);
      }),
    );
  }
}
