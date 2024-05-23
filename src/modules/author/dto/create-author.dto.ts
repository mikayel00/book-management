import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateAuthorDto {
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
