const { PrismaClient } = require('@prisma/client');

const MAX_RETRIES = 30;
const RETRY_DELAY = 2000;

async function waitForDatabase() {
  const prisma = new PrismaClient();
  
  console.log('🔄 Waiting for database connection...');
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connected successfully!');
      await prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(`❌ Database connection attempt ${i + 1}/${MAX_RETRIES} failed:`, error.message);
      
      if (i === MAX_RETRIES - 1) {
        console.log('💥 Max retries reached. Database may not be available.');
        await prisma.$disconnect();
        return false;
      }
      
      console.log(`⏳ Retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

async function runMigrations() {
  console.log('🔄 Running database migrations...');
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Migration failed:', error.message);
        console.log('stderr:', stderr);
        reject(error);
      } else {
        console.log('✅ Migrations completed successfully!');
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function runSeed() {
  console.log('🔄 Running database seed...');
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec('npx prisma db seed', (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️ Seed failed (this is ok if data already exists):', error.message);
        // Don't reject - seeding can fail if data already exists
        resolve();
      } else {
        console.log('✅ Seed completed successfully!');
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function main() {
  console.log('🚀 Starting database setup...');
  
  const dbConnected = await waitForDatabase();
  
  if (!dbConnected) {
    console.log('⚠️ Starting server without database connection...');
    process.exit(0); // Don't fail the deployment
  }
  
  try {
    await runMigrations();
    await runSeed();
    console.log('✅ Database setup completed successfully!');
  } catch (error) {
    console.log('⚠️ Database setup had issues but continuing:', error.message);
  }
}

main().catch(console.error);
