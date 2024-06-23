// src/user/user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: { name?: string; email?: string; password?: string },
  ): Promise<User | null> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User | null> {
    return this.userService.remove(id);
  }
}
