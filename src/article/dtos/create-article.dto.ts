import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @Length(3, 100, { message: 'title is too short or too long' })
  readonly title: string;

  @IsString()
  @Length(10, 2000, { message: 'body is too short' })
  readonly body: string;

  @IsNumber()
  @IsOptional()
  author: number;

  @IsString()
  @IsOptional()
  cover_image: string;
}
