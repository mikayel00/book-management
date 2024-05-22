import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserEntity } from '../user/user.entity';
@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  async createToken(user: UserEntity): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.jwtConfig.secret,
    });
  }
}
