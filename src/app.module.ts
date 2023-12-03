import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { UsertypeModule } from './usertype/usertype.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ArticleModule),
    CommentModule,
    TypeOrmModule.forRoot(config),
    UsertypeModule,
    TagModule,
    AuthModule,
    MulterModule.register({
      dest: '../assets/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
