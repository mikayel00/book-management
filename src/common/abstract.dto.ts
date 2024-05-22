import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class AbstractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsDate()
  @IsNumber()
  created_at!: number;

  @ApiProperty()
  @IsDate()
  @IsNumber()
  updated_at!: number;
}
