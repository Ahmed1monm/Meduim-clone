import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    forwardRef(() => CommentModule),
    forwardRef(() => AppModule),
    UserModule,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
