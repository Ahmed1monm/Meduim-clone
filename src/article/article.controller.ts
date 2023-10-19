import { Controller, Get, HttpCode } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('/')
  @HttpCode(200)
  async findAll(): Promise<{ data: ArticleEntity[] }> {
    const articles: ArticleEntity[] = await this.articleService.findAll();
    return { data: articles };
  }
}
