import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }
  findOneArticle(id: number): Promise<ArticleEntity> {
    return this.articleRepository.findOneBy({ id });
  }
}
