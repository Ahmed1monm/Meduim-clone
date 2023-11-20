import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ArticleEntity } from '../article/article.entity';
import { UserEntity } from '../user/user.entity';
@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => ArticleEntity, (article: ArticleEntity) => article.comments)
  @JoinColumn()
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
