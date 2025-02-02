import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class HttpExceptionBase extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
}