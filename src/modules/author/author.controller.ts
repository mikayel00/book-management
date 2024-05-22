import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { AuthorService } from './author.service';
import { AuthorEntity } from './author.entity';

@Controller('authors')
@ApiTags('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all authors',
  })
  getAll(): Promise<AuthorEntity[]> {
    return this.authorService.getAll();
  }
}
