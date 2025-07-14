import { UserProfile } from '@prisma/client';
import { prisma } from '../lib/prisma';

export interface CreateUserProfileData {
  userId: string;
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

export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
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

export class UserProfileService {
  static async createProfile(profileData: CreateUserProfileData): Promise<UserProfile> {
    return prisma.userProfile.create({
      data: profileData,
    });
  }

  static async findProfileByUserId(userId: string): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({
      where: { userId },
    });
  }

  static async updateProfile(userId: string, data: UpdateUserProfileData): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  }

  static async deleteProfile(userId: string): Promise<void> {
    await prisma.userProfile.delete({
      where: { userId },
    });
  }

  static async upsertProfile(userId: string, data: UpdateUserProfileData): Promise<UserProfile> {
    return prisma.userProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
      },
    });
  }
}
