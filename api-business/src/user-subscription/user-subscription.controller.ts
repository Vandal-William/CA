import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscription, Prisma } from '@prisma/client';

@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @Post()
  async create(
    @Body() data: Prisma.UserSubscriptionCreateInput,
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.createUserSubscription(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserSubscription | null> {
    return this.userSubscriptionService.getUserSubscriptionById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.UserSubscriptionUpdateInput,
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.updateUserSubscription(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserSubscription> {
    return this.userSubscriptionService.deleteUserSubscription(id);
  }

  @Get()
  async findAll(): Promise<UserSubscription[]> {
    return this.userSubscriptionService.getAllUserSubscriptions();
  }
}
