import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}
