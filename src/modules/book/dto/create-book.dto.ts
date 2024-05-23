import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isbn!: string;

  @ApiProperty({ default: '2024-05-23' })
  @IsNotEmpty()
  @IsDateString()
  published_at!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  author_id!: number;
}
