import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interface/error-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest<Request>().url,
    };

    response.status(status).json(errorResponse);
  }
}