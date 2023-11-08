import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.article)
  comments: CommentEntity[];
}
