import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'USER',
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: new Date('1990-01-01'),
          phoneNumber: '+1-555-0123',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'US',
          annualIncome: 75000,
          creditScore: 720,
          employmentStatus: 'Employed'
        }
      }
    },
    include: {
      profile: true
    }
  });

  console.log('👤 Created test user:', user.email);

  // Create a credit card for the user
  const creditCard = await prisma.creditCard.create({
    data: {
      userId: user.id,
      cardNumber: '4532123456789012',
      cardholderName: 'John Doe',
      expiryMonth: 12,
      expiryYear: 2027,
      cvv: '123',
      creditLimit: 5000,
      currentBalance: 0,
      availableCredit: 5000,
      apr: 18.99,
      status: 'ACTIVE',
      cycleStartDate: 1
    }
  });

  console.log('💳 Created credit card:', creditCard.cardNumber);

  // Create some sample transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      {
        creditCardId: creditCard.id,
        type: 'PURCHASE',
        amount: 125.50,
        description: 'Grocery shopping at SuperMart',
        category: 'GROCERIES',
        merchantName: 'SuperMart',
        location: 'Anytown, CA'
      },
      {
        creditCardId: creditCard.id,
        type: 'PURCHASE',
        amount: 45.00,
        description: 'Gas station fill-up',
        category: 'GAS',
        merchantName: 'Shell Gas Station',
        location: 'Anytown, CA'
      },
      {
        creditCardId: creditCard.id,
        type: 'PURCHASE',
        amount: 89.99,
        description: 'Online shopping - Amazon',
        category: 'SHOPPING',
        merchantName: 'Amazon',
        location: 'Online'
      }
    ]
  });

  console.log('💰 Created sample transactions:', transactions.count);

  // Update credit card balance
  const totalSpent = 125.50 + 45.00 + 89.99;
  await prisma.creditCard.update({
    where: { id: creditCard.id },
    data: {
      currentBalance: totalSpent,
      availableCredit: creditCard.creditLimit - totalSpent
    }
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
