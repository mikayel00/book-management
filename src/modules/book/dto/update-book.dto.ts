import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiProperty({ default: '2024-05-23' })
  @IsOptional()
  @IsDateString()
  published_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  author_id?: number;
}
