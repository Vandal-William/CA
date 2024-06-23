// src/temp-comment/temp-comment.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TempComment } from '@prisma/client';

@Injectable()
export class TempCommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TempComment[]> {
    return this.prisma.tempComment.findMany();
  }

  async findOne(id: string): Promise<TempComment | null> {
    return this.prisma.tempComment.findUnique({
      where: { id },
    });
  }

  async create(data: {
    content: string;
    userId: string;
    publicationId: string;
  }): Promise<TempComment> {
    return this.prisma.tempComment.create({
      data: {
        content: data.content,
        userId: data.userId,
        publicationId: data.publicationId,
      },
    });
  }

  async update(
    id: string,
    data: { content?: string; userId?: string; publicationId?: string },
  ): Promise<TempComment | null> {
    return this.prisma.tempComment.update({
      where: { id },
      data: {
        content: data.content,
        userId: data.userId,
        publicationId: data.publicationId,
      },
    });
  }

  async remove(id: string): Promise<TempComment | null> {
    return this.prisma.tempComment.delete({
      where: { id },
    });
  }
}
