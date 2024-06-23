import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserSubscriptionService, PrismaService],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}
