import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { AbstractDto } from '../../../common/abstract.dto';

export class AuthorDto extends AbstractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  birth_date!: string;
}
