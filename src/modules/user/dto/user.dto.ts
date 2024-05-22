import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';
import { UserEntity } from '../user.entity';

export class UserDto {
  @ApiProperty()
  @IsString()
  email!: string;

  constructor(entity: UserEntity) {
    this.email = entity.email;
  }
}
