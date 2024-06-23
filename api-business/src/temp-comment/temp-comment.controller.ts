// src/temp-comment/temp-comment.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TempCommentService } from './temp-comment.service';
import { TempComment } from '@prisma/client';

@Controller('temp-comments')
export class TempCommentController {
  constructor(private readonly tempCommentService: TempCommentService) {}

  @Get()
  async findAll(): Promise<TempComment[]> {
    return this.tempCommentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TempComment | null> {
    return this.tempCommentService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    createTempCommentDto: {
      content: string;
      userId: string;
      publicationId: string;
    },
  ): Promise<TempComment> {
    return this.tempCommentService.create(createTempCommentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateTempCommentDto: {
      content?: string;
      userId?: string;
      publicationId?: string;
    },
  ): Promise<TempComment | null> {
    return this.tempCommentService.update(id, updateTempCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TempComment | null> {
    return this.tempCommentService.remove(id);
  }
}
