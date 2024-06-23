import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { TempCommentModule } from './temp-comment/temp-comment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserSubscriptionController } from './user-subscription/user-subscription.controller';
import { UserSubscriptionService } from './user-subscription/user-subscription.service';
import { UserSubscriptionModule } from './user-subscription/user-subscription.module';
import { BenefitModule } from './benefit/benefit.module';
import { RevenueController } from './revenue/revenue.controller';
import { RevenueService } from './revenue/revenue.service';
import { RevenueModule } from './revenue/revenue.module';
import { UserController } from './user/user.controller';
import { SubscriptionController } from './subscription/subscription.controller';
import { TempCommentController } from './temp-comment/temp-comment.controller';
import { BenefitController } from './benefit/benefit.controller';
import { TempCommentService } from './temp-comment/temp-comment.service';
import { UserService } from './user/user.service';
import { SubscriptionService } from './subscription/subscription.service';
import { BenefitService } from './benefit/benefit.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    CommentModule,
    TempCommentModule,
    SubscriptionModule,
    UserSubscriptionModule,
    BenefitModule,
    RevenueModule,
  ],
  controllers: [
    CommentController,
    UserSubscriptionController,
    RevenueController,
    UserController,
    SubscriptionController,
    TempCommentController,
    BenefitController,
  ],
  providers: [
    CommentService,
    UserSubscriptionService,
    RevenueService,
    TempCommentService,
    UserService,
    SubscriptionService,
    BenefitService,
    PrismaService,
  ],
})
export class AppModule {}
