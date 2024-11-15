/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateUtil } from '@/common/utils/date.util';

@Injectable()
export class TimestampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        next: () => this.setHeaders(context),
        // headerに追加する日時をエラー時に付与したい場合、Interceptorまでこないエラーがあるのでfilterでやる必要あり.
        // error: () => this.setHeaders(context),
      }),
    );
  }

  private setHeaders(context: ExecutionContext): void {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader('X-Timestamp', DateUtil.getNowString());
  }
}
