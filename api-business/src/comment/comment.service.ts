import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async findOne(id: string): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async create(data: {
    content: string;
    userId: string;
    publicationId: string;
  }): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        publicationId: data.publicationId,
      },
    });
  }

  async update(id: string, data: { content: string }): Promise<Comment | null> {
    return this.prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
    });
  }

  async remove(id: string): Promise<Comment | null> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
