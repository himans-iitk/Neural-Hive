import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CloudLoggerService) {}

  use(request: Request, _response: Response, next: () => void) {
    // リクエスト毎に一意となるIDを採番しログ出力することでトレースしやすくする.
    request.uuid = uuidv4();
    const { method, originalUrl } = request;
    this.logger.verbose(
      `[${request.uuid}] Incoming request - ${method} - ${originalUrl}`,
      this.logger.getRequestInfo(request),
    );
    next();
  }
}
