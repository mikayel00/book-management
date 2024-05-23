import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class AuthorDto extends AbstractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio!: string;

  @ApiProperty({ default: '2024-05-23' })
  @IsNotEmpty()
  @IsDateString()
  birth_date!: Date;
}
