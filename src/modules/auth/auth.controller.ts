import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenDto,
    description: 'Authorize user with email and password',
  })
  login(@Body() authDto: AuthDto): Promise<TokenDto> {
    return this.authService.login(authDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Sign up user with email and password',
  })
  signUp(@Body() authDto: AuthDto): Promise<UserDto> {
    return this.authService.signUp(authDto);
  }
}
