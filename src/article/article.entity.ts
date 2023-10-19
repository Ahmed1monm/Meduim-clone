import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
