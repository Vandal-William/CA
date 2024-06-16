import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PublicationService } from '../src/publication/publication.service';
import { CategoriesService } from '../src/categories/categories.service';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Connexion à la base de données MongoDB
  await mongoose.connect(
    'mongodb+srv://attitude:attitude@ca.u9zede9.mongodb.net/attitudes',
    {},
  );

  const publicationService = app.get(PublicationService);
  const categoryService = app.get(CategoriesService);

  try {
    // Vérifier si les collections existent et les supprimer si c'est le cas
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const categoriesCollectionExists = collections.some(
      (coll) => coll.name === 'categories',
    );

    if (categoriesCollectionExists) {
      await mongoose.connection.db.dropCollection('categories');
      console.log('Collection "categories" supprimée.');
    }

    const publicationsCollectionExists = collections.some(
      (coll) => coll.name === 'publications',
    );

    if (publicationsCollectionExists) {
      await mongoose.connection.db.dropCollection('publications');
      console.log('Collection "publications" supprimée.');
    }

    // Créer des catégories
    const categoryData = [
      { name: 'Tech' },
      { name: 'Lifestyle' },
      { name: 'Health' },
    ];

    const categories = await Promise.all(
      categoryData.map(async (cat) => {
        return categoryService.create(cat) as unknown as { _id: string };
      }),
    );

    const publicationsData = [
      {
        title: 'Publication Tech 1',
        cover:
          'https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg',
        categoryId: categories[0]._id as string,
        summary: 'Résumé de la publication Tech 1',
        time: Date.now(),
        blocks: [
          {
            id: '1',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Tech 1.',
            },
          },
        ],
      },
      {
        title: 'Publication Tech 2',
        cover:
          'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
        categoryId: categories[0]._id as string,
        summary: 'Résumé de la publication Tech 2',
        time: Date.now(),
        blocks: [
          {
            id: '2',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Tech 2.',
            },
          },
        ],
      },
      {
        title: 'Publication Lifestyle 1',
        cover:
          'https://www.istockphoto.com/resources/images/PhotoFTLP/FR/NatureLandscapes-508488398.jpg',
        categoryId: categories[1]._id as string,
        summary: 'Résumé de la publication Lifestyle 1',
        time: Date.now(),
        blocks: [
          {
            id: '3',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Lifestyle 1.',
            },
          },
        ],
      },
      {
        title: 'Publication Lifestyle 2',
        cover:
          'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
        categoryId: categories[1]._id as string,
        summary: 'Résumé de la publication Lifestyle 2',
        time: Date.now(),
        blocks: [
          {
            id: '4',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Lifestyle 2.',
            },
          },
        ],
      },
      {
        title: 'Publication Health 1',
        cover:
          'https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png',
        categoryId: categories[2]._id as string,
        summary: 'Résumé de la publication Health 1',
        time: Date.now(),
        blocks: [
          {
            id: '5',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Health 1.',
            },
          },
        ],
      },
      {
        title: 'Publication Health 2',
        cover:
          'https://imgv3.fotor.com/images/gallery/a-colorful-girl-watching-the-floating-colorful-water-created-by-Fotor-ai.jpg',
        categoryId: categories[2]._id as string,
        summary: 'Résumé de la publication Health 2',
        time: Date.now(),
        blocks: [
          {
            id: '6',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Health 2.',
            },
          },
        ],
      },
      {
        title: 'Publication Tech 3',
        cover:
          'https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg',
        categoryId: categories[0]._id as string,
        summary: 'Résumé de la publication Tech 3',
        time: Date.now(),
        blocks: [
          {
            id: '7',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Tech 3.',
            },
          },
        ],
      },
      {
        title: 'Publication Lifestyle 3',
        cover:
          'https://media.gettyimages.com/id/1215119911/fr/photo/regardant-directement-vers-le-haut-%C3%A0-lhorizon-du-quartier-financier-dans-le-centre-de.jpg?s=612x612&w=gi&k=20&c=X0K1pWk1_CMeQTHIwWypUV9jA8hhJbHBhHdN5yuz_YU=',
        categoryId: categories[1]._id as string,
        summary: 'Résumé de la publication Lifestyle 3',
        time: Date.now(),
        blocks: [
          {
            id: '8',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Lifestyle 3.',
            },
          },
        ],
      },
      {
        title: 'Publication Health 3',
        cover:
          'https://kinsta.com/fr/wp-content/uploads/sites/4/2020/09/jpeg.jpg',
        categoryId: categories[2]._id as string,
        summary: 'Résumé de la publication Health 3',
        time: Date.now(),
        blocks: [
          {
            id: '9',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Health 3.',
            },
          },
        ],
      },
      {
        title: 'Publication Tech 4',
        cover:
          'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
        categoryId: categories[0]._id as string,
        summary: 'Résumé de la publication Tech 4',
        time: Date.now(),
        blocks: [
          {
            id: '10',
            type: 'paragraph',
            data: {
              text: 'Contenu de la publication Tech 4.',
            },
          },
        ],
      },
    ];

    // Insérer les données dans la collection publications
    await Promise.all(
      publicationsData.map(async (pub) => {
        await publicationService.create(pub);
      }),
    );

    console.log('Données de publication insérées avec succès.');
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion des données de publication ou de catégories :",
      error,
    );
  } finally {
    // Fermer l'application NestJS
    await app.close();
  }
}

bootstrap();
