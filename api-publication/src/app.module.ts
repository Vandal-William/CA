import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModule } from './publication/publication.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://attitude:attitude@ca.u9zede9.mongodb.net/attitudes',
    ),
    PublicationModule,
    CategoriesModule,
  ],
})
export class AppModule {}
