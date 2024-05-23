import { NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor() {
    super('error.authorNotFound');
  }
}
