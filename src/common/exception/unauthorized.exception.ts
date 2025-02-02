import { HttpExceptionBase } from './base/http-exception.base';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpExceptionBase {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}