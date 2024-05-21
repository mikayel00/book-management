import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorBookEntity } from '../author-book/author-book.entity';

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

  @OneToMany(
    () => AuthorBookEntity,
    (authorBookEntity) => authorBookEntity.author,
  )
  authorBooks?: AuthorBookEntity[];
}
