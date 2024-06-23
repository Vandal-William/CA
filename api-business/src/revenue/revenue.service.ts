import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Revenue } from '@prisma/client';

@Injectable()
export class RevenueService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Revenue[]> {
    return this.prisma.revenue.findMany();
  }

  async findOne(id: string): Promise<Revenue | null> {
    return this.prisma.revenue.findUnique({
      where: { id },
    });
  }

  async create(data: { amount: number; date: Date }): Promise<Revenue> {
    return this.prisma.revenue.create({
      data: {
        amount: data.amount,
        date: data.date,
      },
    });
  }

  async update(
    id: string,
    data: { amount?: number; date?: Date },
  ): Promise<Revenue | null> {
    return this.prisma.revenue.update({
      where: { id },
      data: {
        amount: data.amount,
        date: data.date,
      },
    });
  }

  async remove(id: string): Promise<Revenue | null> {
    return this.prisma.revenue.delete({
      where: { id },
    });
  }
}
