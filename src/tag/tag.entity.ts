import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
