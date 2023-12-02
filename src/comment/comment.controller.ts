import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: CommentEntity }> {
    const comment: CommentEntity = await this.commentService.findOneComment(id);
    return { data: comment };
  }
}
