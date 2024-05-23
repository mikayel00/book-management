import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateAuthorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ default: '2024-05-23' })
  @IsOptional()
  @IsDateString()
  birth_date?: Date;
}
