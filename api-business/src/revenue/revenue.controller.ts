import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { Revenue } from '@prisma/client';

@Controller('revenues')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  async findAll(): Promise<Revenue[]> {
    return this.revenueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Revenue | null> {
    return this.revenueService.findOne(id);
  }

  @Post()
  async create(
    @Body() createRevenueDto: { amount: number; date: Date },
  ): Promise<Revenue> {
    return this.revenueService.create(createRevenueDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRevenueDto: { amount?: number; date?: Date },
  ): Promise<Revenue | null> {
    return this.revenueService.update(id, updateRevenueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Revenue | null> {
    return this.revenueService.remove(id);
  }
}
