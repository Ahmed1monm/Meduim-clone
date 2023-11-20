import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ArticleEntity } from '../article/article.entity';
import { UsertypeEntity } from '../usertype/usertype.entity';
import { CommentEntity } from '../comment/comment.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  bio: string;

  @Column()
  image: string;

  @Column()
  password: string;

  @OneToMany(() => ArticleEntity, (article) => article.author, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  article: ArticleEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => UsertypeEntity, (type: UsertypeEntity) => type.users)
  type: UsertypeEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user)
  comments: CommentEntity[];
}
