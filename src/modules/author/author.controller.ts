import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { AuthorService } from './author.service';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
@ApiTags('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Create Author',
  })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    return this.authorService.create(createAuthorDto);
  }

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOkResponse({
    description: 'Update author',
  })
  update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<void> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete author',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.authorService.delete(id);
  }
}
