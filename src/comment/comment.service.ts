import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/createComment.dto';
import { ArticleEntity } from '../article/article.entity';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}
  async findOneComment(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({
      relations: ['user', 'article'],
      where: { id },
    });
  }
  async createComment(comment: CreateCommentDto): Promise<CommentEntity> {
    return this.commentRepository.create(comment);
  }

  async findArticleComments(id: number): Promise<CommentEntity[]> {
    const article: ArticleEntity[] =
      await this.articleService.findOneArticle(id);
    return await this.commentRepository.find({
      relations: ['user', 'article'],
      where: { article: article[0] },
    });
  }
}
