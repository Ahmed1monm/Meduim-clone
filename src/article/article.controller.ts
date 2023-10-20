import {
  Controller,
  Get,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateResult } from 'typeorm';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<{ data: ArticleEntity[] }> {
    const articles: ArticleEntity[] = await this.articleService.findAll();
    return { data: articles };
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getArticle(@Param('id') id: string): Promise<{ data: ArticleEntity }> {
    const article: ArticleEntity = await this.articleService.findOneArticle(
      parseInt(id, 10),
    );
    return { data: article };
  }
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<{ data: ArticleEntity }> {
    const article: ArticleEntity =
      await this.articleService.createArticle(createArticleDto);
    return { data: article };
  }
  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Body() createArticleDto: CreateArticleDto,
    @Param('id') id: string,
  ): Promise<{ message: string; numberOfAffectedRows: number }> {
    const article: UpdateResult = await this.articleService.updateArticle(
      parseInt(id),
      createArticleDto,
    );
    return {
      message: 'Article updated successfully',
      numberOfAffectedRows: article.affected,
    };
  }
}
