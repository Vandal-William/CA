import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { SearchPublicationDto } from './dto/search.dto';
import { Publication } from './publication.schema';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }

  @Get()
  findAll() {
    return this.publicationService.findAll();
  }

  @Post('search')
  async searchPublications(
    @Body() searchParams: SearchPublicationDto,
  ): Promise<Publication[]> {
    return this.publicationService.findSearchPublication(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: any) {
    return this.publicationService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
