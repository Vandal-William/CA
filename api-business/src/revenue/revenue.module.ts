// src/revenue/revenue.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';

@Module({
  imports: [PrismaModule],
  providers: [RevenueService],
  controllers: [RevenueController],
})
export class RevenueModule {}
