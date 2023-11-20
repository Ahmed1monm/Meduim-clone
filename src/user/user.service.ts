import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findOneByUsername(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({ username });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }
}
