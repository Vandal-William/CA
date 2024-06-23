// src/temp-comment/temp-comment.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TempCommentService } from './temp-comment.service';
import { TempCommentController } from './temp-comment.controller';

@Module({
  imports: [PrismaModule],
  providers: [TempCommentService],
  controllers: [TempCommentController],
})
export class TempCommentModule {}
