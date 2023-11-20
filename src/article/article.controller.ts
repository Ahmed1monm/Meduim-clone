import {
  Controller,
  Get,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';

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
  async getArticle(
    @Param('id') id: string,
  ): Promise<{ data: ArticleEntity[] }> {
    const article: ArticleEntity[] = await this.articleService.findOneArticle(
      parseInt(id, 10),
    );
    return { data: article };
  }
  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req,
  ): Promise<{ data: ArticleEntity[] }> {
    const user = req.user;
    createArticleDto.author = user.id;
    const article: ArticleEntity[] =
      await this.articleService.createArticle(createArticleDto);
    return { data: article };
  }
  @UseGuards(AuthGuard)
  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Body() createArticleDto: CreateArticleDto,
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ message: string; numberOfAffectedRows: number }> {
    const article: ArticleEntity[] = await this.articleService.findOneArticle(
      parseInt(id),
    );
    if (!article[0]) {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
    if (article[0].author.id !== req.user.id) {
      throw new UnauthorizedException(
        `You are not allowed to update this article ${req.user.id}`,
      );
    }
    const updatedArticle: UpdateResult =
      await this.articleService.updateArticle(parseInt(id), createArticleDto);
    return {
      message: 'Article updated successfully',
      numberOfAffectedRows: updatedArticle.affected,
    };
  }
}
