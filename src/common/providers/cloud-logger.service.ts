/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService } from '@nestjs/common';
import { Request } from 'express';

type Payload = { [key: string]: any };
type Severity = 'DEFAULT' | 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

/**
 * GCPのロギング形式でログ出力。AWSのCloudWatchでも有効。
 * 参考）https://zenn.dev/moga/articles/cloudrun-structured-log
 */
@Injectable()
export class CloudLoggerService implements LoggerService {
  public log(message: string, payload?: Payload) {
    this.output('DEFAULT', message, payload);
  }

  public debug(message: string, payload?: Payload) {
    this.output('DEBUG', message, payload);
  }

  public verbose(message: string, payload?: Payload) {
    this.output('INFO', message, payload);
  }

  public warn(message: string, payload?: Payload) {
    this.output('WARNING', message, payload);
  }

  public error(message: string, payload?: Payload) {
    this.output('ERROR', message, payload);
  }

  private output(severity: Severity, message: string, payload?: Payload) {
    // timestampは自動で入るので送信しなくてよい
    const entry: any = {
      severity,
      message,
      ...payload,
    };

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        '-------------------------------------------------------------------------------------------------',
      );
      console.log(entry);
      console.log(
        '-------------------------------------------------------------------------------------------------',
      );
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  public getRequestInfo(request: Request): any {
    const {
      method,
      originalUrl,
      body,
      params,
      query,
      headers,
      hostname,
      ip,
      user,
      uuid,
    } = request;
    return {
      request: {
        method,
        url: originalUrl,
        body,
        params,
        query,
        headers,
        hostname,
        ip,
        userId: user?.['id'],
        uuid,
      },
    };
  }
}
