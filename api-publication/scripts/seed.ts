import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PublicationService } from '../src/publication/publication.service';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Connexion à la base de données MongoDB
  await mongoose.connect(
    'mongodb+srv://attitude:attitude@ca.u9zede9.mongodb.net/attitudes',
    {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    },
  );

  const publicationService = app.get(PublicationService);

  const publicationData = {
    title: 'Publication test 1',
    cover:
      'data:image/jpeg;base64,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',
    time: Date.now(),
    blocks: [
      {
        id: 'mhTl6ghSkV',
        type: 'paragraph',
        data: {
          text: 'Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓',
        },
      },
      {
        id: 'l98dyx3yjb',
        type: 'header',
        data: {
          text: 'Key features',
          level: 3,
        },
      },
      {
        id: 'os_YI4eub4',
        type: 'list',
        data: {
          type: 'unordered',
          items: [
            'It is a block-style editor',
            'It returns clean data output in JSON',
            'Designed to be extendable and pluggable with a <a href="https://editorjs.io/creating-a-block-tool">simple API</a>',
          ],
        },
      },
      {
        id: '1yKeXKxN7-',
        type: 'header',
        data: {
          text: 'What does it mean «block-styled editor»',
          level: 3,
        },
      },
      {
        id: 'TcUNySG15P',
        type: 'paragraph',
        data: {
          text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup data-tune='footnotes'>1</sup> contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
        },
        tunes: {
          footnotes: [
            'It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.',
          ],
        },
      },
      {
        id: 'M3UXyblhAo',
        type: 'header',
        data: {
          text: 'What does it mean clean data output?',
          level: 3,
        },
      },
      {
        id: 'KOcIofZ3Z1',
        type: 'paragraph',
        data: {
          text: "There are dozens of ready-to-use Blocks and a simple API <sup data-tune='footnotes'>2</sup> for creating any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.",
        },
        tunes: {
          footnotes: [
            "Just take a look at our Creating Block Tool guide. You'll be surprised.",
          ],
        },
      },
      {
        id: 'ksCokKAhQw',
        type: 'paragraph',
        data: {
          text: "Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class='cdx-marker'>Editor.js outputs JSON object</mark> with data of each Block.",
        },
      },
      {
        id: 'XKNT99-qqS',
        type: 'attaches',
        data: {
          file: {
            url: 'https://drive.google.com/user/catalog/my-file.pdf',
            size: 12902,
            name: 'file.pdf',
            extension: 'pdf',
          },
          title: 'My file',
        },
      },
      {
        id: '7RosVX2kcH',
        type: 'paragraph',
        data: {
          text: 'Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create the markup for Facebook Instant Articles or Google AMP, generate an audio version, and so on.',
        },
      },
      {
        id: 'eq06PsNsab',
        type: 'paragraph',
        data: {
          text: 'Clean data is useful to sanitize, validate and process on the backend.',
        },
      },
      {
        id: 'hZAjSnqYMX',
        type: 'image',
        data: {
          file: {
            url: 'assets/codex2x.png',
          },
          withBorder: false,
          withBackground: false,
          stretched: true,
          caption: 'CodeX Code Camp 2019',
        },
      },
    ],
  };

  try {
    // Vérifier si la collection publications existe
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionExists = collections.some(
      (coll) => coll.name === 'publications',
    );

    // Si la collection existe, la supprimer
    if (collectionExists) {
      await mongoose.connection.db.dropCollection('publications');
      console.log('Collection "publications" supprimée.');
    }

    // Insérer les données dans la collection
    await publicationService.create(publicationData);
    console.log('Données de publication insérées avec succès.');
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion des données de publication :",
      error,
    );
  } finally {
    // Fermer l'application NestJS
    await app.close();
  }
}

bootstrap();
