// src/subscription/subscription.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subscription } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany();
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    description: string;
    amount: string;
  }): Promise<Subscription> {
    return this.prisma.subscription.create({
      data: {
        name: data.name,
        description: data.description,
        amount: data.amount,
      },
    });
  }

  async update(
    id: string,
    data: { name?: string; description?: string; amount?: string },
  ): Promise<Subscription | null> {
    return this.prisma.subscription.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        amount: data.amount,
      },
    });
  }

  async remove(id: string): Promise<Subscription | null> {
    return this.prisma.subscription.delete({
      where: { id },
    });
  }
}
