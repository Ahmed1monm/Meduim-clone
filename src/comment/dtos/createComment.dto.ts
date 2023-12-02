import { IsString, Length } from 'class-validator';
import { ArticleEntity } from '../../article/article.entity';
import { UserEntity } from '../../user/user.entity';

export class CreateCommentDto {
  @IsString()
  @Length(1, 255, { message: 'body is too long' })
  readonly body: string;

  readonly article: ArticleEntity;

  user: UserEntity;
}
