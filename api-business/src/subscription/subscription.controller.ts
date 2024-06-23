import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '@prisma/client';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subscription | null> {
    return this.subscriptionService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    createSubscriptionDto: {
      name: string;
      description: string;
      amount: string;
    },
  ): Promise<Subscription> {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateSubscriptionDto: {
      name?: string;
      description?: string;
      amount?: string;
    },
  ): Promise<Subscription | null> {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Subscription | null> {
    return this.subscriptionService.remove(id);
  }
}
