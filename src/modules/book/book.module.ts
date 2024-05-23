import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [AuthorModule, TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
