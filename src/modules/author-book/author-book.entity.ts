import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorEntity } from '../author/author.entity';
import { BookEntity } from '../book/book.entity';

@Entity({ name: 'author-books' })
@Unique(['author_id', 'book_id'])
export class AuthorBookEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date;

  @Column({ type: 'int' })
  author_id!: number;

  @Column({ type: 'int' })
  book_id!: number;

  @ManyToOne(() => AuthorEntity, (authorEntity) => authorEntity.authorBooks)
  @JoinColumn({ name: 'author_id' })
  author?: AuthorEntity;

  @ManyToOne(() => BookEntity, (bookEntity) => bookEntity.authorBooks)
  @JoinColumn({ name: 'book_id' })
  book?: AuthorEntity;
}
