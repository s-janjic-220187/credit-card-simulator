/**
 * ProfilePage Component
 *
 * Main user profile management page that handles:
 * - Profile creation for new users
 * - Prof            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.profile.noProfile.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {t.profile.noProfile.description}
            </p>
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              {t.profile.noProfile.createButton}
            </button>ng for existing users
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileDashboard from "../components/Profile/ProfileDashboard";
import ProfileForm from "../components/Profile/ProfileForm";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";
import { profileService } from "../services/profileService";
import { CreateUserProfileData, UserProfile } from "../types";

const ProfilePage = () => {
  const { t } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { state } = useUser();
  const { user } = state;

  // Fetch profile data
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User not found");
      }
      return profileService.getProfile(user.id);
    },
    retry: false,
    enabled: !!user?.id,
  });

  // Create/Update profile mutation
  const profileMutation = useMutation({
    mutationFn: (profileData: CreateUserProfileData) => {
      if (!user?.id) {
        throw new Error("User not found");
      }
      if (profile) {
        return profileService.updateProfile(profileData, user.id);
      } else {
        return profileService.createProfile(profileData, user.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      setIsEditing(false);
      toast.success(profile ? t.success.updated : t.success.created);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t.errors.generic);
    },
  });

  const handleSaveProfile = (profileData: Partial<UserProfile>) => {
    // Convert Partial<UserProfile> to CreateUserProfileData
    const createData: CreateUserProfileData = {
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      dateOfBirth: profileData.dateOfBirth,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zipCode: profileData.zipCode,
      country: profileData.country || "US",
      employmentStatus: profileData.employmentStatus,
      annualIncome: profileData.annualIncome,
      creditScore: profileData.creditScore,
    };
    profileMutation.mutate(createData);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Please log in
          </h3>
          <p className="text-gray-600">
            You need to be logged in to access your profile
          </p>
        </div>
      </div>
    );
  }

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
            <p className="text-gray-600 mt-1">
              Set up your personal information
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Profile Found
            </h3>
            <p className="text-gray-600 mb-4">
              Create your profile to get started with the credit card simulator
            </p>
            <button onClick={() => setIsEditing(true)} className="btn-primary">
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
          <button onClick={() => setIsEditing(true)} className="btn-primary">
            {t.profile.dashboard.editProfile}
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
        profile && (
          <ProfileDashboard
            profile={profile}
            onEdit={() => setIsEditing(true)}
          />
        )
      )}
    </div>
  );
};

export default ProfilePage;
