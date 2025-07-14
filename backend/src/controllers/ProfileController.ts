import { Request, Response } from 'express';
import { UserProfileService } from '../models/UserProfile';
import { UserService } from '../models/User';
import Joi from 'joi';

// Validation schemas
const createProfileSchema = Joi.object({
  firstName: Joi.string().required().trim().min(1).max(50),
  lastName: Joi.string().required().trim().min(1).max(50),
  dateOfBirth: Joi.date().optional().max('now'),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  country: Joi.string().optional().default('US'),
  employmentStatus: Joi.string().optional(),
  annualIncome: Joi.number().min(0).optional(),
  creditScore: Joi.number().min(300).max(850).optional(),
});

const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50),
  lastName: Joi.string().trim().min(1).max(50),
  dateOfBirth: Joi.date().max('now'),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zipCode: Joi.string(),
  country: Joi.string(),
  employmentStatus: Joi.string(),
  annualIncome: Joi.number().min(0),
  creditScore: Joi.number().min(300).max(850),
});

export class ProfileController {
  /**
   * Create a new user profile
   */
  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      // For now, assume userId = 1 as mentioned in requirements
      const userId = req.params.userId || '1';

      // Validate request body
      const { error, value } = createProfileSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Check if user exists
      const user = await UserService.findUserById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Check if profile already exists
      const existingProfile = await UserProfileService.findProfileByUserId(userId);
      if (existingProfile) {
        res.status(409).json({
          success: false,
          message: 'Profile already exists for this user'
        });
        return;
      }

      // Create profile
      const profileData = { ...value, userId };
      const profile = await UserProfileService.createProfile(profileData);

      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get user profile by user ID
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      const profile = await UserProfileService.findProfileByUserId(userId);
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      // Validate request body
      const { error, value } = updateProfileSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Check if profile exists
      const existingProfile = await UserProfileService.findProfileByUserId(userId);
      if (!existingProfile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      // Update profile
      const updatedProfile = await UserProfileService.updateProfile(userId, value);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Delete user profile
   */
  static async deleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      // Check if profile exists
      const profile = await UserProfileService.findProfileByUserId(userId);
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      await UserProfileService.deleteProfile(userId);

      res.json({
        success: true,
        message: 'Profile deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Create or update profile (upsert)
   */
  static async upsertProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      // Validate request body
      const { error, value } = createProfileSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Check if user exists
      const user = await UserService.findUserById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Upsert profile
      const profile = await UserProfileService.upsertProfile(userId, value);

      res.json({
        success: true,
        message: 'Profile saved successfully',
        data: profile
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
