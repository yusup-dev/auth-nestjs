import { HttpStatus } from '@nestjs/common';
import { HttpExceptionBase } from './base/http-exception.base';

export class BadRequestException extends HttpExceptionBase {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}