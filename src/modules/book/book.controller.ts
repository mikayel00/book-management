import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Create Book',
  })
  create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.bookService.create(createBookDto);
  }
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOkResponse({
    description: 'Update book',
  })
  update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<void> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete book',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.bookService.delete(id);
  }
}
