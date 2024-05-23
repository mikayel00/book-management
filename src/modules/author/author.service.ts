import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorNotFoundException } from './exceptions/author-not-found.exception';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const authorEntity = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(authorEntity);

    return authorEntity;
  }

  async getAll(): Promise<AuthorEntity[]> {
    return this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'books')
      .getMany();
  }

  async getOne(id: number): Promise<AuthorEntity | null> {
    return this.authorRepository
      .createQueryBuilder('author')
      .where('author.id =:id', { id })
      .getOne();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<void> {
    const authorEntity = await this.getOne(id);

    if (!authorEntity) {
      throw new AuthorNotFoundException();
    }

    this.authorRepository.merge(authorEntity, updateAuthorDto);

    await this.authorRepository.save(authorEntity);
  }

  async delete(id: number): Promise<void> {
    await this.authorRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .delete()
      .execute();
  }
}
