const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

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
          employmentStatus: 'EMPLOYED'
        }
      }
    },
    include: {
      profile: true
    }
  });

  console.log('👤 Created test user:', user.email);

  // Create demo user for quick testing
  const demoHashedPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      username: 'demo',
      email: 'demo@example.com',
      password: demoHashedPassword,
      role: 'USER',
      profile: {
        create: {
          firstName: 'Demo',
          lastName: 'User',
          country: 'US',
          annualIncome: 50000,
          creditScore: 720
        }
      }
    },
    include: {
      profile: true
    }
  });

  console.log('🎯 Created demo user:', demoUser.email);

  // Create admin user for administrative access
  const adminHashedPassword = await bcrypt.hash('admin', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@admin.com',
      password: adminHashedPassword,
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          phoneNumber: '+1-555-ADMIN',
          address: '789 Admin Boulevard',
          city: 'Admin City',
          state: 'CA',
          zipCode: '90210',
          country: 'US',
          annualIncome: 100000,
          creditScore: 800,
          employmentStatus: 'EMPLOYED'
        }
      }
    },
    include: {
      profile: true
    }
  });

  console.log('👨‍💼 Created admin user:', adminUser.email);

  // Create demo credit card for demo user
  try {
    const existingCard = await prisma.creditCard.findFirst({
      where: { userId: demoUser.id }
    });

    if (!existingCard) {
      const creditCard = await prisma.creditCard.create({
        data: {
          userId: demoUser.id,
          cardNumber: '4532' + Math.random().toString().substr(2, 12),
          cardholderName: `${demoUser.profile?.firstName} ${demoUser.profile?.lastName}`,
          expiryMonth: 12,
          expiryYear: 2030,
          cvv: Math.floor(Math.random() * 900 + 100).toString(),
          creditLimit: 5000,
          currentBalance: 0,
          availableCredit: 5000,
          apr: 18.99,
          status: 'ACTIVE',
          issueDate: new Date(),
          cycleStartDate: 1,
          minimumPayment: 0,
          billingCycleLength: 30,
          gracePerod: 21,
          lateFeePct: 0,
          lateFeeFlat: 35,
          overlimitFeePct: 0,
          overlimitFeeFlat: 25,
          foreignTransFee: 0.03,
          annualFee: 0,
          cashAdvanceFee: 0.05,
          cashAdvanceApr: 29.99,
          balanceTransferFee: 0.03
        }
      });

      console.log('💳 Created demo credit card:', creditCard.cardNumber);
    } else {
      console.log('💳 Demo credit card already exists');
    }
  } catch (error) {
    console.log('⚠️ Failed to create credit card:', error.message);
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
