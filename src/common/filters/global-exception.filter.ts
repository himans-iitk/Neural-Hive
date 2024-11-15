import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

const globalErrorMessage: Record<number, string> = {
  400: 'VALIDATION_ERROR',
  401: 'AUTHENTICATION_ERROR',
  403: 'MAINTENANCE',
  404: 'NOT_FOUND',
  500: 'SYSTEM_ERROR',
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: CloudLoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const { method, url, uuid } = request;
    const msg = `[${uuid}] response - ${status} - ${method} - ${url}, [msg] ${exception.message}`;
    const logPayload = {
      statusCode: status,
      errorStack: exception.stack,
      httpExceptionResponse:
        exception instanceof HttpException
          ? exception.getResponse()
          : undefined,
      ...this.logger.getRequestInfo(request),
    };
    if (status >= 500) {
      this.logger.error(`[error] ${msg}`, logPayload);
    } else {
      this.logger.warn(`[warn] ${msg}`, logPayload);
    }

    const responseFields: Array<{ field: string; message: string }> = [];

    if (
      status == 400 &&
      exception instanceof I18nValidationException &&
      exception.errors
    ) {
      exception.errors.forEach(fields => {
        if (fields?.constraints) {
          for (const value of Object.entries(fields.constraints)) {
            responseFields.push({ field: fields.property, message: value[1] });
          }
        }
      });
    }

    const globalError = globalErrorMessage[status]
      ? globalErrorMessage[status]
      : globalErrorMessage[500];

    // response.status(status).send();
    response.status(status).json({
      error: globalError,
      global: [{ message: exception.message }],
      fields: responseFields,
    });
  }
}
