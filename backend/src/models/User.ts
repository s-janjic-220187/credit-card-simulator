import { User, UserProfile } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export type UserWithProfile = User & {
  profile?: UserProfile | null;
};

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

export interface CreateUserProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  annualIncome?: number;
  creditScore?: number;
  employmentStatus?: string;
}

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      include: {
        profile: true,
      },
    });
  }

  static async findUserById(id: string): Promise<UserWithProfile | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  static async findUserByEmail(email: string): Promise<UserWithProfile | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  static async findUserByUsername(username: string): Promise<UserWithProfile | null> {
    return prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
      },
    });
  }

  static async updateUser(id: string, data: Partial<User>): Promise<UserWithProfile> {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true,
      },
    });
  }

  static async updateLastLogin(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }

  static async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  static async createOrUpdateProfile(userId: string, profileData: CreateUserProfileData): Promise<UserProfile> {
    return prisma.userProfile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        ...profileData,
      },
    });
  }
}
