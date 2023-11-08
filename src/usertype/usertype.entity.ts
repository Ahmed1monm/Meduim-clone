import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class UsertypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.type)
  users: UserEntity[];
}
