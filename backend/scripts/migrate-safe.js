#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function checkDatabaseExists() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

async function checkTablesExist() {
  try {
    // Try to query a main table to see if schema exists
    await prisma.$queryRaw`SELECT 1 FROM users LIMIT 1`;
    console.log('📊 Database tables exist');
    return true;
  } catch (error) {
    console.log('📝 Database tables do not exist yet');
    return false;
  }
}

async function checkMigrationsFolder() {
  const migrationsPath = path.join(__dirname, '..', 'prisma', 'migrations');
  return fs.existsSync(migrationsPath);
}

async function runMigrations() {
  console.log('🔄 Running migrations...');
  
  return new Promise((resolve, reject) => {
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Migration failed:', error.message);
        console.log('stderr:', stderr);
        reject(error);
      } else {
        console.log('✅ Migrations completed successfully!');
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

async function runDbPush() {
  console.log('🔄 Pushing database schema...');
  
  return new Promise((resolve, reject) => {
    exec('npx prisma db push', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ DB push failed:', error.message);
        console.log('stderr:', stderr);
        reject(error);
      } else {
        console.log('✅ Database schema pushed successfully!');
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

async function main() {
  console.log('🚀 Starting safe database migration...');
  
  // Check if database is accessible
  const dbExists = await checkDatabaseExists();
  if (!dbExists) {
    console.log('💥 Database not accessible, exiting...');
    process.exit(1);
  }
  
  // Check if tables already exist
  const tablesExist = await checkTablesExist();
  
  // Check if migrations folder exists
  const migrationsExist = await checkMigrationsFolder();
  
  try {
    if (migrationsExist) {
      console.log('📁 Migrations folder found, running migrate deploy...');
      await runMigrations();
    } else if (!tablesExist) {
      console.log('🆕 No migrations and no tables, pushing schema...');
      await runDbPush();
    } else {
      console.log('📊 Tables exist but no migrations folder, skipping schema changes...');
      console.log('⚠️ Consider creating migrations if schema changes are needed');
    }
    
    console.log('✅ Database migration completed successfully!');
    
  } catch (error) {
    console.log('⚠️ Migration had issues but continuing:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('💥 Migration script failed:', error);
  process.exit(1);
});
