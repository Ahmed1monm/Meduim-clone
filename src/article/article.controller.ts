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
  ParseIntPipe,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/dtos/createComment.dto';
import { UserService } from '../user/user.service';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<{ data: ArticleEntity[] }> {
    const articles: ArticleEntity[] = await this.articleService.findAll();
    return { data: articles };
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getArticle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: ArticleEntity[] }> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string; numberOfAffectedRows: number }> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
    if (!article[0]) {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
    if (article[0].author.id !== req.user.id) {
      throw new UnauthorizedException(
        `You are not allowed to update this article ${req.user.id}`,
      );
    }
    const updatedArticle: UpdateResult =
      await this.articleService.updateArticle(id, createArticleDto);
    return {
      message: 'Article updated successfully',
      numberOfAffectedRows: updatedArticle.affected,
    };
  }
  @Post('/:id/comment')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { body: string },
    @Request() req,
  ): Promise<{ message: string; comment: CommentEntity }> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
    if (!article[0]) {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
    const user = req.user;
    const comment: CreateCommentDto = {
      body: body.body,
      article: await this.getArticle(id)[0],
      user: await this.userService.findOneByUsername(user.username),
    };
    const createdComment: CommentEntity =
      await this.commentService.createComment(comment);
    return { message: 'Comment created successfully', comment: createdComment };
  }
  @Patch('/:id/comment/:commentId')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: { body: string },
    @Request() req,
  ): Promise<{ message: string; comment: CommentEntity }> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
    if (!article[0]) {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
    const comment: CommentEntity =
      await this.commentService.findOneComment(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }
    if (comment.user.id !== req.user.id) {
      throw new UnauthorizedException(
        `You are not allowed to update this comment ${req.user.id}`,
      );
    }
    comment.body = body.body;
    const updatedComment: CommentEntity =
      await this.commentService.createComment(comment);
    return { message: 'Comment updated successfully', comment: updatedComment };
  }
  @Get('/:id/comment')
  @HttpCode(HttpStatus.OK)
  async getComments(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: CommentEntity[] }> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
    if (!article[0]) {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
    const comments: CommentEntity[] =
      await this.commentService.findArticleComments(id);
    return { data: comments };
  }
}
