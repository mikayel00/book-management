import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('error.invalidCredentials');
  }
}
