import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment as CommentModel } from '@prisma/client';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<CommentModel[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentModel | null> {
    return this.commentService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: { content: string; userId: string; publicationId: string },
  ): Promise<CommentModel> {
    return this.commentService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { content: string },
  ): Promise<CommentModel | null> {
    return this.commentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CommentModel | null> {
    return this.commentService.remove(id);
  }
}
