import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorBookEntity } from "./author-book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthorBookEntity])],
  controllers: [],
  providers: [],
})
export class AuthorBookModule {}
