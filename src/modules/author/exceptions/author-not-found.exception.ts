import { NotFoundException } from '@nestjs/common';

export class AuthorNotFoundException extends NotFoundException {
  constructor() {
    super('error.authorNotFound');
  }
}
