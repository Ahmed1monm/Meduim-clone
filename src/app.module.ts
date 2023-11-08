import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { UsertypeModule } from './usertype/usertype.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    UserModule,
    ArticleModule,
    CommentModule,
    TypeOrmModule.forRoot(config),
    UsertypeModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
