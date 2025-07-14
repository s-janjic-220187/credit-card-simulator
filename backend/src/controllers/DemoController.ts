import { Request, Response } from 'express';
import { UserService } from '../models/User';
import { UserProfileService } from '../models/UserProfile';
import { CreditCardService } from '../models/CreditCard';

export class DemoController {
  /**
   * Create demo data for testing
   */
  static async createDemoData(_req: Request, res: Response): Promise<void> {
    try {
      // Check if demo user already exists
      let user = await UserService.findUserByEmail('demo@example.com');
      
      if (!user) {
        // Create demo user only if it doesn't exist
        user = await UserService.createUser({
          username: 'demo',
          email: 'demo@example.com',
          password: 'demo123' // This would be hashed in a real app
        });
      }

      // Check if demo profile already exists
      let profile = await UserProfileService.findProfileByUserId(user.id);
      
      if (!profile) {
        // Create demo profile only if it doesn't exist
        profile = await UserProfileService.createProfile({
          userId: user.id,
          firstName: 'Demo',
          lastName: 'User',
          annualIncome: 50000,
          creditScore: 720
        });
      }

      // Check if demo credit card already exists
      const existingCards = await CreditCardService.findCreditCardsByUserId(user.id);
      
      let creditCard = null;
      if (existingCards.length === 0) {
        // Create demo credit card only if none exist
        creditCard = await CreditCardService.createCreditCard({
          userId: user.id,
          cardholderName: 'Demo User',
          creditLimit: 5000,
          apr: 18.9,
          cycleStartDate: 1
        });
      } else {
        creditCard = existingCards[0]; // Use the first existing card
      }

      res.status(201).json({
        success: true,
        message: 'Demo data ensured successfully',
        data: {
          user,
          profile,
          creditCard,
          note: 'Demo user and data already existed or was created as needed'
        }
      });
    } catch (error) {
      console.error('Error creating demo data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create demo data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Reset all demo data
   */
  static async resetDemoData(_req: Request, res: Response): Promise<void> {
    try {
      // This would delete all demo data - implement with caution
      res.status(200).json({
        success: true,
        message: 'Demo data reset feature not implemented for safety'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to reset demo data'
      });
    }
  }
}

export default DemoController;
