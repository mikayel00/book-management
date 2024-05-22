import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { UserService } from '../user/user.service';
import { JwtTokenService } from './jwt-token.service';
import { UserDto } from '../user/dto/user.dto';
import { UserExistsException } from '../user/exceptions/user-exists.exception';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtTokenService,
    private utilsService: UtilsService,
  ) {}
  async login(authDto: AuthDto): Promise<TokenDto> {
    const userEntity = await this.userService.validate(authDto);

    const isValid = await this.utilsService.isPasswordValid(
      authDto.password,
      userEntity.password,
    );

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtTokenService.createToken(userEntity);

    return new TokenDto(token);
  }

  async signUp(authDto: AuthDto): Promise<UserDto> {
    const userEntity = await this.userService.getByEmail(authDto.email);

    if (userEntity) {
      throw new UserExistsException();
    }

    return this.userService.create(authDto);
  }
}
