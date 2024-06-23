import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserSubscription, Prisma } from '@prisma/client';

@Injectable()
export class UserSubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createUserSubscription(
    data: Prisma.UserSubscriptionCreateInput,
  ): Promise<UserSubscription> {
    return this.prisma.userSubscription.create({ data });
  }

  async getUserSubscriptionById(id: string): Promise<UserSubscription | null> {
    return this.prisma.userSubscription.findUnique({
      where: { id },
    });
  }

  async updateUserSubscription(
    id: string,
    data: Prisma.UserSubscriptionUpdateInput,
  ): Promise<UserSubscription> {
    return this.prisma.userSubscription.update({
      where: { id },
      data,
    });
  }

  async deleteUserSubscription(id: string): Promise<UserSubscription> {
    return this.prisma.userSubscription.delete({
      where: { id },
    });
  }

  async getAllUserSubscriptions(): Promise<UserSubscription[]> {
    return this.prisma.userSubscription.findMany();
  }
}
