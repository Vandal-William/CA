import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    PublicationModule,
  ],
})
export class AppModule {}
