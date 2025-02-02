import { HttpExceptionBase } from './base/http-exception.base';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpExceptionBase {
    constructor(message: string) {
      super(message, HttpStatus.NOT_FOUND);
    }
  }
  