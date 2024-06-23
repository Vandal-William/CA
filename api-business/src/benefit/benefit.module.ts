import { Module } from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { BenefitController } from './benefit.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BenefitService, PrismaService],
  controllers: [BenefitController],
})
export class BenefitModule {}
