import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class AbstractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  created_at!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updated_at!: Date;
}
