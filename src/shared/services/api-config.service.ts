import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get appConfig() {
    return {
      port: this.configService.get<string>('PORT')!,
      env: this.configService.get<string>('NODE_ENV'),
    };
  }

  get databaseCredentials() {
    return {
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
    };
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];

    const subscribers = [__dirname + '/../../entity-subscribers/*{.ts,.js}'];

    return {
      entities,
      migrations,
      subscribers,
      type: 'mysql',
      name: 'default',
      host: this.databaseCredentials.host,
      port: this.databaseCredentials.port,
      username: this.databaseCredentials.username,
      password: this.databaseCredentials.password,
      database: this.databaseCredentials.database,
      migrationsRun: true,
      synchronize: false,
      logging: true,
    };
  }

  get jwtConfig() {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
    };
  }
}
