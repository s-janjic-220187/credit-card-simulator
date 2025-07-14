/**
 * ProfilePage Component
 * 
 * Main user profile management page that handles:
 * - Profile creation for new users
 * - Profile editing for existing users
 * - Integration with ProfileForm and ProfileDashboard components
 * - Error handling and loading states
 * 
 * Features:
 * - React Query for data fetching and caching
 * - Form validation and error handling
 * - Responsive design with loading indicators
 * - Toast notifications for user feedback
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { profileService } from '../services/profileService';
import ProfileForm from '../components/Profile/ProfileForm';
import ProfileDashboard from '../components/Profile/ProfileDashboard';
import { CreateUserProfileData, UserProfile } from '../types';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    retry: false,
  });

  // Create/Update profile mutation
  const profileMutation = useMutation({
    mutationFn: (profileData: CreateUserProfileData) => {
      if (profile) {
        return profileService.updateProfile(profileData);
      } else {
        return profileService.createProfile(profileData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
      toast.success(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    },
  });

  const handleSaveProfile = (profileData: Partial<UserProfile>) => {
    // Convert Partial<UserProfile> to CreateUserProfileData
    const createData: CreateUserProfileData = {
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      dateOfBirth: profileData.dateOfBirth,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zipCode: profileData.zipCode,
      country: profileData.country || 'US',
      employmentStatus: profileData.employmentStatus,
      annualIncome: profileData.annualIncome,
      creditScore: profileData.creditScore,
    };
    profileMutation.mutate(createData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Set up your personal information</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Profile Found</h3>
            <p className="text-gray-600 mb-4">Create your profile to get started with the credit card simulator</p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Create Profile
            </button>
          </div>
        </div>

        {isEditing && (
          <ProfileForm
            onSubmit={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
            isLoading={profileMutation.isPending}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {profile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <ProfileForm
          profile={profile}
          onSubmit={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
          isLoading={profileMutation.isPending}
        />
      ) : (
        profile && <ProfileDashboard profile={profile} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default ProfilePage;
