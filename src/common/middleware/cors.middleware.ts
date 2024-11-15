import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // CORS対策(OPTIONSメソッドはapp.enableCors()のオプション preflightContinue: false により後続処理されない).
    const allowedOrigins = process.env.ORIGIN?.split(',');
    const origin = req.header('origin');
    if (origin && allowedOrigins?.includes(origin)) {
      // OPTIONSメソッド時はX-Timestampはつかないので、Middlewareでこのヘッダーは付与.
      res.header('Access-Control-Expose-Headers', 'X-Timestamp');
    }
    next();
  }
}
