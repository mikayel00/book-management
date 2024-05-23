import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorService } from '../author/author.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookNotFoundException } from './exceptions/book-not-found.exception';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private authorService: AuthorService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const authorEntity = await this.authorService.getOne(
      createBookDto.author_id,
    );

    if (!authorEntity) {
      throw new BookNotFoundException();
    }

    const bookEntity = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(bookEntity);

    return bookEntity;
  }

  async getAll(): Promise<BookEntity[]> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .getMany();
  }

  async getOne(id: number): Promise<BookEntity | null> {
    return this.bookRepository
      .createQueryBuilder('book')
      .where('book.id =:id', { id })
      .getOne();
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<void> {
    const bookEntity = await this.getOne(id);

    if (!bookEntity) {
      throw new BookNotFoundException();
    }

    if (updateBookDto.author_id) {
      const authorEntity = await this.authorService.getOne(
        updateBookDto.author_id,
      );

      if (!authorEntity) {
        throw new BookNotFoundException();
      }
    }

    this.bookRepository.merge(bookEntity, updateBookDto);

    await this.bookRepository.save(bookEntity);
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .delete()
      .execute();
  }
}
