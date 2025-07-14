import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import api from '../services/api';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  annualIncome?: number;
  creditScore?: number;
  employmentStatus?: string;
}

export interface CreditCard {
  id: string;
  userId: string;
  cardholderName: string;
  cardNumber: string;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  apr: number;
  status: string;
}

interface UserState {
  user: User | null;
  profile: UserProfile | null;
  creditCards: CreditCard[];
  isAuthenticated: boolean;
  isLoading: boolean;
  currentStep: 'login' | 'profile' | 'cards' | 'dashboard';
}

type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_CREDIT_CARDS'; payload: CreditCard[] }
  | { type: 'ADD_CREDIT_CARD'; payload: CreditCard }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STEP'; payload: UserState['currentStep'] }
  | { type: 'LOGOUT' };

const initialState: UserState = {
  user: null,
  profile: null,
  creditCards: [],
  isAuthenticated: false,
  isLoading: false,
  currentStep: 'login',
};

function userReducer(state: UserState, action: UserAction): UserState {
  console.log('🔄 UserReducer called with action:', action.type, action);
  
  switch (action.type) {
    case 'SET_USER':
      console.log('✅ Setting user:', action.payload);
      const newStepAfterUser = state.profile ? 'cards' : 'profile';
      console.log('🔄 SET_USER: current profile exists?', !!state.profile, 'new step will be:', newStepAfterUser);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        currentStep: newStepAfterUser,
      };
    case 'SET_PROFILE':
      console.log('✅ Setting profile:', action.payload);
      const newStepAfterProfile = state.creditCards.length > 0 ? 'dashboard' : 'cards';
      console.log('🔄 SET_PROFILE: current credit cards count:', state.creditCards.length, 'new step will be:', newStepAfterProfile);
      return {
        ...state,
        profile: action.payload,
        currentStep: newStepAfterProfile,
      };
    case 'SET_CREDIT_CARDS':
      console.log('✅ Setting credit cards:', action.payload);
      const newStepAfterCards = action.payload.length > 0 ? 'dashboard' : 'cards';
      console.log('🔄 SET_CREDIT_CARDS: credit cards count:', action.payload.length, 'new step will be:', newStepAfterCards);
      return {
        ...state,
        creditCards: action.payload,
        currentStep: newStepAfterCards,
      };
    case 'ADD_CREDIT_CARD':
      return {
        ...state,
        creditCards: [...state.creditCards, action.payload],
        currentStep: 'dashboard',
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('👤 UserProvider is initializing...');
  const [state, dispatch] = useReducer(userReducer, initialState);
  console.log('👤 UserProvider initial state:', initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Helper hooks for common operations
export const useUserActions = () => {
  const { state, dispatch } = useUser();

  const login = async (userId: string) => {
    console.log('🔐 UserContext login function called with userId:', userId);
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      console.log('🔍 Login attempt for userId:', userId);
      
      if (userId === 'demo-user') {
        console.log('🎯 Attempting demo user login...');
        
        // Use the backend demo API
        console.log('📡 Making API call to /api/users/login');
        const response = await api.post('/users/login', {
          email: 'demo@example.com',
          password: 'demo123',
        });

        console.log('📡 Demo login response status:', response.status);
        console.log('📡 Demo login response headers:', response.headers);

        // Axios automatically throws for non-2xx status codes, so if we get here, it was successful
        const data = response.data;
        console.log('✅ Demo login successful, data:', data);
        
        if (data.success) {
          const user = data.data.user;
          console.log('👤 Setting user in context:', user);
          dispatch({ type: 'SET_USER', payload: user });
          
          if (user.profile) {
            console.log('👤 User has profile, setting it:', user.profile);
            dispatch({ type: 'SET_PROFILE', payload: user.profile });
          } else {
            console.log('👤 User has no profile');
          }
          
          // Fetch user's credit cards
          console.log('💳 Fetching credit cards for user:', user.id);
          try {
            const cardsResponse = await api.get(`/${user.id}/cards`);
            console.log('💳 Credit cards response status:', cardsResponse.status);
            console.log('💳 Credit cards response data:', cardsResponse.data);
            if (cardsResponse.data.success) {
              console.log('💳 Setting credit cards:', cardsResponse.data.data);
              dispatch({ type: 'SET_CREDIT_CARDS', payload: cardsResponse.data.data });
            } else {
              console.log('💳 Credit cards response not successful');
            }
          } catch (error) {
            console.log('💳 No credit cards found or error fetching cards');
          }
        } else {
          console.error('❌ Login response success was false:', data);
          throw new Error('Login response indicated failure');
        }
      } else {
        // For real users, fetch their data
        try {
          const userResponse = await api.get(`/users/${userId}`);
          dispatch({ type: 'SET_USER', payload: userResponse.data.data });
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }

        try {
          const profileResponse = await api.get(`/profile/${userId}`);
          dispatch({ type: 'SET_PROFILE', payload: profileResponse.data.data });
        } catch (error) {
          console.log('No profile found for user');
        }

        try {
          const cardsResponse = await api.get(`/${userId}/cards`);
          dispatch({ type: 'SET_CREDIT_CARDS', payload: cardsResponse.data.data || [] });
        } catch (error) {
          console.log('No credit cards found for user');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // Handle Axios errors specifically
      if (error.response) {
        console.error('❌ Demo login failed with status:', error.response.status);
        console.error('❌ Demo login error data:', error.response.data);
        throw new Error(`Failed to login with demo account: ${error.response.status} ${error.response.data}`);
      } else {
        throw error; // Re-throw other errors
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setProfile = (profile: UserProfile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
  };

  const createProfile = async (profileData: Partial<UserProfile>) => {
    if (!state.user) {
      throw new Error('No user logged in');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/profile/${state.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
      }

      const data = await response.json();
      dispatch({ type: 'SET_PROFILE', payload: data.data });
    } catch (error) {
      console.error('Profile creation error:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addCreditCard = (card: CreditCard) => {
    dispatch({ type: 'ADD_CREDIT_CARD', payload: card });
  };

  const goToStep = (step: UserState['currentStep']) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  return {
    login,
    logout,
    setProfile,
    createProfile,
    addCreditCard,
    goToStep,
  };
};
