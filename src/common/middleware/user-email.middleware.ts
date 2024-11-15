import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserEmailMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // Headerから認証済みユーザーのEmailを取得する
    const emailHeader = req.headers['x-goog-authenticated-user-email'];
    const email =
      emailHeader && emailHeader.toString().replace('accounts.google.com:', '');

    req.user = email;
    next();
  }
}
