import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all books',
  })
  getAll(): Promise<BookEntity[]> {
    return this.bookService.getAll();
  }
}
