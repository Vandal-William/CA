import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { Benefit, Prisma } from '@prisma/client';

@Controller('benefits')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Post()
  async create(
    @Body() data: { description: string; subscriptionId: string },
  ): Promise<Benefit> {
    return this.benefitService.createBenefit({
      description: data.description,
      subscription: { connect: { id: data.subscriptionId } },
    });
  }

  @Get()
  async findAll(): Promise<Benefit[]> {
    return this.benefitService.getAllBenefits();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Benefit | null> {
    return this.benefitService.getBenefitById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.BenefitUpdateInput,
  ): Promise<Benefit> {
    return this.benefitService.updateBenefit(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Benefit> {
    return this.benefitService.deleteBenefit(id);
  }
}
