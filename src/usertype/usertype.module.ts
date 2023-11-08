import { Module } from '@nestjs/common';
import { UsertypeController } from './usertype.controller';
import { UsertypeService } from './usertype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsertypeEntity } from './usertype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsertypeEntity])],
  controllers: [UsertypeController],
  providers: [UsertypeService],
})
export class UsertypeModule {}
