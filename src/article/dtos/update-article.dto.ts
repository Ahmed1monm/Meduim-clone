import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  @Length(3, 100, { message: 'title is too short or too long' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @Length(10, 2000, { message: 'body is too short' })
  readonly body: string;
}
