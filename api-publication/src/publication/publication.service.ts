import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication } from './publication.schema';
import { CreatePublicationDto } from './dto/create-publication.dto';

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
