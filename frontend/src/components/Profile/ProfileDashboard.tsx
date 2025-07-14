import React from 'react';
import { UserProfile } from '../../types';

interface ProfileDashboardProps {
  profile: UserProfile;
  onEdit: () => void;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ profile, onEdit }) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getEmploymentStatusLabel = (status: string) => {
    switch (status) {
      case 'EMPLOYED': return 'Employed';
      case 'UNEMPLOYED': return 'Unemployed';
      case 'SELF_EMPLOYED': return 'Self Employed';
      case 'RETIRED': return 'Retired';
      case 'STUDENT': return 'Student';
      default: return status;
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-600">Name:</span>
              <span className="ml-2 text-gray-800">
                {profile.firstName} {profile.lastName}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Date of Birth:</span>
              <span className="ml-2 text-gray-800">
                {profile.dateOfBirth && formatDate(profile.dateOfBirth)}
              </span>
            </div>
            {profile.phoneNumber && (
              <div>
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="ml-2 text-gray-800">{profile.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Address</h3>
          <div className="space-y-1 text-gray-800">
            <div>{profile.address}</div>
            <div>
              {profile.city}, {profile.state} {profile.zipCode}
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Employment</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <span className="ml-2 text-gray-800">
                {profile.employmentStatus && getEmploymentStatusLabel(profile.employmentStatus)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Annual Income:</span>
              <span className="ml-2 text-gray-800">
                {profile.annualIncome && formatCurrency(profile.annualIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* Credit Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Credit Information</h3>
          <div>
            <span className="font-medium text-gray-600">Credit Score:</span>
            <span className={`ml-2 font-semibold ${profile.creditScore && getCreditScoreColor(profile.creditScore)}`}>
              {profile.creditScore}
            </span>
            {profile.creditScore && (
              <>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      profile.creditScore >= 750 ? 'bg-green-600' :
                      profile.creditScore >= 650 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${(profile.creditScore - 300) / 5.5}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>300</span>
                  <span>850</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-600">Profile Created:</span>
            <span className="ml-2 text-gray-800">
              {formatDate(profile.createdAt)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Last Updated:</span>
            <span className="ml-2 text-gray-800">
              {formatDate(profile.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
