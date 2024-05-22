import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { UserDto } from './dto/user.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private utilsService: UtilsService,
  ) {}

  async validate(authDto: AuthDto): Promise<UserEntity> {
    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: authDto.email })
      .getOne();

    if (!userEntity) {
      throw new InvalidCredentialsException();
    }

    return userEntity;
  }

  async getByEmail(email: string): Promise<UserDto | void> {
    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email =:email', { email })
      .getOne();

    if (userEntity) return new UserDto(userEntity);
  }

  async create(authDto: AuthDto): Promise<UserDto> {
    const hashedPassword = await this.utilsService.hashPassword(
      authDto.password,
    );

    const newUserEntity = this.userRepository.create({
      ...authDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUserEntity);

    return new UserDto(newUserEntity);
  }
}
