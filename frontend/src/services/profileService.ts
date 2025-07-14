import api from './api';
import { ApiResponse, UserProfile, CreateUserProfileData } from '../types';

export const profileService = {
  // Get user profile
  async getProfile(userId: string = '1'): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>(`/profile/${userId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch profile');
    }
    return response.data.data;
  },

  // Create user profile
  async createProfile(profileData: CreateUserProfileData, userId: string = '1'): Promise<UserProfile> {
    const response = await api.post<ApiResponse<UserProfile>>(`/profile/${userId}`, profileData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create profile');
    }
    return response.data.data;
  },

  // Update user profile
  async updateProfile(profileData: Partial<CreateUserProfileData>, userId: string = '1'): Promise<UserProfile> {
    const response = await api.put<ApiResponse<UserProfile>>(`/profile/${userId}`, profileData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update profile');
    }
    return response.data.data;
  },

  // Create or update profile (upsert)
  async upsertProfile(profileData: CreateUserProfileData, userId: string = '1'): Promise<UserProfile> {
    const response = await api.patch<ApiResponse<UserProfile>>(`/profile/${userId}`, profileData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to save profile');
    }
    return response.data.data;
  },

  // Delete user profile
  async deleteProfile(userId: string = '1'): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/profile/${userId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete profile');
    }
  },
};
