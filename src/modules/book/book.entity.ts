import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorBookEntity } from '../author-book/author-book.entity';

@Entity({ name: 'books' })
export class BookEntity {
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

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  isbn!: string;

  @Column({ type: 'date' })
  published_at!: Date;

  @Column({ type: 'date' })
  author_id!: string;

  @OneToMany(
    () => AuthorBookEntity,
    (authorBookEntity) => authorBookEntity.book,
  )
  authorBooks?: AuthorBookEntity[];
}
