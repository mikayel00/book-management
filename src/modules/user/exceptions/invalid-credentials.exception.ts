import { ConflictException } from '@nestjs/common';

export class InvalidCredentialsException extends ConflictException {
  constructor() {
    super('error.invalidCredentials');
  }
}
