import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString, validateSync } from '@nestjs/class-validator';
import { plainToClass } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Injectable()
export class DotenvDto {
  @IsString()
  @IsNotEmpty()
  PORT!: string;

  @IsString()
  @IsNotEmpty()
  NODE_ENV!: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  DB_PORT!: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE!: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(DotenvDto, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
