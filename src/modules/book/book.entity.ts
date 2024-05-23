import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorEntity } from '../author/author.entity';

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

  @Column({ type: 'int' })
  author_id!: number;

  @ManyToOne(() => AuthorEntity, (authorEntity) => authorEntity.books, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author?: AuthorEntity;
}
