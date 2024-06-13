import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publication, PublicationSchema } from './publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
