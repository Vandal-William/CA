import { PrismaClient, SubscriptionStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function truncateTables() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subscription" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "TempComment" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Revenue" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "UserSubscription" CASCADE;`;
}

// IDs des publications spécifiques
const publicationIds = [
  '666f079181621221b673f966',
  '666f079181621221b673f967',
  '666f079181621221b673f968',
  '666f079181621221b673f96d',
  '666f079181621221b673f96c',
  '666f079181621221b673f96b',
  '666f079181621221b673f96e',
  '666f079181621221b673f96f',
  '666f079181621221b673f96a',
  '666f079181621221b673f969',
];

async function main() {
  try {
    await truncateTables(); // Vider les tables avant d'insérer les données

    // Créer 40 utilisateurs
    const users = [];
    for (let i = 0; i < 40; i++) {
      const user = await prisma.user.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
      users.push(user);
    }

    // Créer 4 abonnements
    const subscriptions = [];
    for (let i = 0; i < 4; i++) {
      const subscription = await prisma.subscription.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          amount: generateRandomAmount(),
        },
      });
      subscriptions.push(subscription);
    }

    // Créer 40 commentaires
    const fetchUsers = await prisma.user.findMany(); // Récupérer tous les utilisateurs
    const comments = [];
    for (let i = 0; i < 40; i++) {
      const comment = await prisma.tempComment.create({
        data: {
          content: faker.lorem.sentence(),
          userId: fetchUsers[i % fetchUsers.length].id,
          publicationId: publicationIds[i % publicationIds.length], // Utilisation des IDs prédéfinis
        },
      });
      comments.push(comment);
    }

    // Créer 40 revenus avec des dates en 2023
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2024-05-29');
    for (let i = 0; i < 1000; i++) {
      const subscription = subscriptions[i % subscriptions.length]; // Répéter les montants des abonnements
      const date = faker.date.between(startDate, endDate);
      await prisma.revenue.create({
        data: {
          amount: parseFloat(subscription.amount), // Utiliser le montant de l'abonnement correspondant
          date,
        },
      });
    }

    // Créer 40 liaisons utilisateur-abonnement
    for (let i = 0; i < 40; i++) {
      const status = faker.helpers.arrayElement([
        SubscriptionStatus.Active,
        SubscriptionStatus.Inactive,
      ]);
      let reason;

      if (status === SubscriptionStatus.Active) {
        reason = 'PaymentValidated';
      } else {
        reason = faker.helpers.arrayElement([
          'PaymentDefault',
          'Unsubscription',
        ]);
      }

      await prisma.userSubscription.create({
        data: {
          userId: users[i % users.length].id,
          subscriptionId: subscriptions[i % subscriptions.length].id,
          status,
          reason,
        },
      });
    }
    console.log('Insertion de données terminée avec succès.');
  } catch (e) {
    console.error("Erreur lors de l'insertion de données :", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  function generateRandomAmount() {
    // Génère un nombre décimal aléatoire entre 30 et 150 avec deux décimales
    const amount = (Math.random() * (150 - 30) + 30).toFixed(2);
    return amount;
  }
}

main();
