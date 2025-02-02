import { HttpExceptionBase } from './base/http-exception.base';
import { HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpExceptionBase {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}