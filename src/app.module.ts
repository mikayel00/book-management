import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/dotenv.dto';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './shared/services/api-config.service';
import { DataSource } from 'typeorm';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { AuthorBookModule } from './modules/author-book/author-book.module';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    AuthorBookModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
      inject: [ApiConfigService],
      dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(new DataSource(options));
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
