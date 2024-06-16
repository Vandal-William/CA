import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication } from './publication.schema';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { SearchPublicationDto } from './dto/search.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel(Publication.name)
    private publicationModel: Model<Publication>,
  ) {}

  async create(
    createPublicationDto: CreatePublicationDto,
  ): Promise<Publication> {
    const createdPublication = new this.publicationModel(createPublicationDto);
    return createdPublication.save();
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationModel.find().exec();
  }

  async findSearchPublication(
    searchParams: SearchPublicationDto,
  ): Promise<Publication[]> {
    const query: any = {};

    if (searchParams.id && searchParams.id.trim() !== '') {
      query.categoryId = searchParams.id.trim();

      if (searchParams.term && searchParams.term.trim() !== '') {
        query.title = { $regex: searchParams.term.trim(), $options: 'i' };
      }
    } else if (searchParams.term && searchParams.term.trim() !== '') {
      query.title = { $regex: searchParams.term.trim(), $options: 'i' };
    } else {
      return this.publicationModel.find().exec();
    }

    const publications = await this.publicationModel.find(query).exec();
    return publications;
  }

  async findOne(id: string): Promise<Publication> {
    return this.publicationModel.findById(id).exec();
  }

  async update(id: string, updatePublicationDto: any): Promise<Publication> {
    return this.publicationModel
      .findByIdAndUpdate(id, updatePublicationDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.publicationModel.findByIdAndDelete(id).exec();
  }
}
