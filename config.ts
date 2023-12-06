import dotenv = require('dotenv');
import { ArticleEntity } from './src/article/article.entity';
import * as process from 'process';
import { UserEntity } from './src/user/user.entity';
import { TagEntity } from './src/tag/tag.entity';
import { CommentEntity } from './src/comment/comment.entity';
import { UsertypeEntity } from './src/usertype/usertype.entity';
dotenv.config();

export const config = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    ArticleEntity,
    UserEntity,
    TagEntity,
    CommentEntity,
    UsertypeEntity,
  ],
  synchronize: true, // process.env.ENVIROMENT === 'development',
};
