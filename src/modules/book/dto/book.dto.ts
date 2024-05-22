import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { AbstractDto } from '../../../common/abstract.dto';

export class BookDto extends AbstractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isbn!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  published_at!: string;
}
