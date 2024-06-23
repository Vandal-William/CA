import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Benefit, Prisma } from '@prisma/client';

@Injectable()
export class BenefitService {
  constructor(private prisma: PrismaService) {}

  async createBenefit(data: Prisma.BenefitCreateInput): Promise<Benefit> {
    return this.prisma.benefit.create({ data });
  }

  async getBenefitById(id: string): Promise<Benefit | null> {
    return this.prisma.benefit.findUnique({
      where: { id },
    });
  }

  async updateBenefit(
    id: string,
    data: Prisma.BenefitUpdateInput,
  ): Promise<Benefit> {
    return this.prisma.benefit.update({
      where: { id },
      data,
    });
  }

  async deleteBenefit(id: string): Promise<Benefit> {
    return this.prisma.benefit.delete({
      where: { id },
    });
  }

  async getAllBenefits(): Promise<Benefit[]> {
    return this.prisma.benefit.findMany();
  }
}
