import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEntity } from '../book/book.entity';

@Entity({ name: 'authors' })
export class AuthorEntity {
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
  name!: string;

  @Column({ type: 'varchar' })
  bio!: string;

  @Column({ type: 'date' })
  birth_date!: Date;

  @OneToMany(() => BookEntity, (bookEntity) => bookEntity.author)
  books?: BookEntity[];
}
