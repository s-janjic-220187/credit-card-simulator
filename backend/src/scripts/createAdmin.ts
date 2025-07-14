/**
 * Admin User Creation Script
 * 
 * Creates the admin user account with admin privileges.
 * Run this script to set up the admin account.
 */

import { UserService } from '../models/User';
import { prisma } from '../lib/prisma';

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@admin.com' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      return;
    }

    // Create admin user
    const adminUser = await UserService.createUser({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'ADMIN'
    });

    // Create admin profile
    const adminProfile = await prisma.userProfile.create({
      data: {
        userId: adminUser.id,
        firstName: 'System',
        lastName: 'Administrator',
        phoneNumber: '+1-000-000-0000',
        address: '123 Admin Street',
        city: 'Admin City',
        state: 'AC',
        zipCode: '00000',
        country: 'System',
        annualIncome: 0,
        creditScore: 850,
        employmentStatus: 'System Administrator'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@admin.com');
    console.log('🔐 Password: admin');
    console.log('👑 Role: ADMIN');
    console.log(`🆔 User ID: ${adminUser.id}`);
    console.log(`📋 Profile ID: ${adminProfile.id}`);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createAdminUser();
}

export { createAdminUser };
