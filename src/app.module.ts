import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { ArticleModule } from './article/article.module';
// import { CommentModule } from './comment/comment.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ArticleEntity } from './article/article.entity';
import dotenv = require('dotenv');
dotenv.config();
@Module({
  // imports: [
  //   UserModule,
  //   ArticleModule,
  //   CommentModule,
  //   TypeOrmModule.forRoot({
  //     type: process.env.DB_TYPE as any,
  //     host: process.env.DB_HOST,
  //     port: process.env.DB_PORT as any,
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_NAME,
  //     entities: [ArticleEntity],
  //     synchronize: true,
  //   }),
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
