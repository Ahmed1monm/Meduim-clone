import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { UpdateArticleDto } from './dtos/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({ order: { id: 'DESC' } });
  }
  async findOneArticle(id: number): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({
      relations: ['author'],
      where: { id },
    });
  }

  async createArticle(article): Promise<ArticleEntity[]> {
    return await this.articleRepository.save(article);
  }
  async updateArticle(
    id: number,
    article: UpdateArticleDto,
  ): Promise<UpdateResult> {
    return await this.articleRepository.update(id, article);
  }
}
