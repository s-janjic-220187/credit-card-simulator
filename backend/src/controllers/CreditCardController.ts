import { Request, Response } from 'express';
import { CreditCardService } from '../models/CreditCard';
import { TransactionService } from '../models/Transaction';
import Joi from 'joi';

// Validation schemas
const createCreditCardSchema = Joi.object({
  cardholderName: Joi.string().required().trim().min(1).max(100),
  creditLimit: Joi.number().min(100).max(100000).required(),
  apr: Joi.number().min(0).max(50).optional(),
  cycleStartDate: Joi.number().min(1).max(28).optional(),
});

const updateCreditCardSchema = Joi.object({
  creditLimit: Joi.number().min(100).max(100000),
  apr: Joi.number().min(0).max(50),
  status: Joi.string().valid('ACTIVE', 'FROZEN', 'CLOSED', 'EXPIRED'),
  cycleStartDate: Joi.number().min(1).max(28),
});

const transactionSchema = Joi.object({
  amount: Joi.number().min(0.01).required(),
  description: Joi.string().required().trim().min(1).max(255),
  category: Joi.string().valid(
    'GROCERIES', 'DINING', 'GAS', 'UTILITIES', 'ENTERTAINMENT', 
    'SHOPPING', 'TRAVEL', 'HEALTHCARE', 'EDUCATION', 'OTHER'
  ).optional(),
  merchantName: Joi.string().optional(),
  location: Joi.string().optional(),
});

export class CreditCardController {
  /**
   * Create a new credit card
   */
  static async createCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      // Validate request body
      const { error, value } = createCreditCardSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Create credit card
      const cardData = { ...value, userId };
      const creditCard = await CreditCardService.createCreditCard(cardData);

      res.status(201).json({
        success: true,
        message: 'Credit card created successfully',
        data: creditCard
      });
    } catch (error) {
      console.error('Error creating credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get all credit cards for a user
   */
  static async getCreditCards(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || '1';

      const creditCards = await CreditCardService.findCreditCardsByUserId(userId);

      res.json({
        success: true,
        data: creditCards
      });
    } catch (error) {
      console.error('Error fetching credit cards:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get a specific credit card by ID
   */
  static async getCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      const creditCard = await CreditCardService.findCreditCardById(cardId);

      if (!creditCard) {
        res.status(404).json({
          success: false,
          message: 'Credit card not found'
        });
        return;
      }

      res.json({
        success: true,
        data: creditCard
      });
    } catch (error) {
      console.error('Error fetching credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update credit card
   */
  static async updateCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      // Validate request body
      const { error, value } = updateCreditCardSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const updatedCard = await CreditCardService.updateCreditCard(cardId, value);

      res.json({
        success: true,
        message: 'Credit card updated successfully',
        data: updatedCard
      });
    } catch (error) {
      console.error('Error updating credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Freeze credit card
   */
  static async freezeCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      const frozenCard = await CreditCardService.freezeCard(cardId);

      res.json({
        success: true,
        message: 'Credit card frozen successfully',
        data: frozenCard
      });
    } catch (error) {
      console.error('Error freezing credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Unfreeze credit card
   */
  static async unfreezeCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      const unfrozenCard = await CreditCardService.unfreezeCard(cardId);

      res.json({
        success: true,
        message: 'Credit card unfrozen successfully',
        data: unfrozenCard
      });
    } catch (error) {
      console.error('Error unfreezing credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Close credit card
   */
  static async closeCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      const closedCard = await CreditCardService.closeCard(cardId);

      res.json({
        success: true,
        message: 'Credit card closed successfully',
        data: closedCard
      });
    } catch (error) {
      console.error('Error closing credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Simulate a purchase transaction
   */
  static async simulatePurchase(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      // Validate request body
      const { error, value } = transactionSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const transaction = await TransactionService.simulatePurchase(
        cardId,
        value.amount,
        value.description,
        value.category || 'OTHER',
        value.merchantName,
        value.location
      );

      res.status(201).json({
        success: true,
        message: 'Purchase transaction created successfully',
        data: transaction
      });
    } catch (error) {
      console.error('Error creating purchase transaction:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Simulate a refund transaction
   */
  static async simulateRefund(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      // Validate request body
      const { error, value } = transactionSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const transaction = await TransactionService.simulateRefund(
        cardId,
        value.amount,
        value.description
      );

      res.status(201).json({
        success: true,
        message: 'Refund transaction created successfully',
        data: transaction
      });
    } catch (error) {
      console.error('Error creating refund transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get transactions for a credit card
   */
  static async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { limit = '50', offset = '0' } = req.query;

      const transactions = await TransactionService.findTransactionsByCardId(
        cardId,
        parseInt(limit as string),
        parseInt(offset as string)
      );

      res.json({
        success: true,
        data: transactions
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get transaction statistics for a credit card
   */
  static async getTransactionStats(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { days = '30' } = req.query;

      const stats = await TransactionService.getTransactionStats(
        cardId,
        parseInt(days as string)
      );

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Create a demo credit card with random realistic data
   */
  static async createDemoCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      // Random demo credit card configurations
      const demoConfigs = [
        {
          cardholderName: 'Default User',
          creditLimit: 5000,
          apr: 18.9,
          cycleStartDate: 1
        },
        {
          cardholderName: 'Default User',
          creditLimit: 3000,
          apr: 24.99,
          cycleStartDate: 15
        },
        {
          cardholderName: 'Default User',
          creditLimit: 10000,
          apr: 14.99,
          cycleStartDate: 5
        },
        {
          cardholderName: 'Default User',
          creditLimit: 7500,
          apr: 21.49,
          cycleStartDate: 10
        },
        {
          cardholderName: 'Default User',
          creditLimit: 2000,
          apr: 29.99,
          cycleStartDate: 20
        }
      ];

      // Select a random configuration
      const randomConfig = demoConfigs[Math.floor(Math.random() * demoConfigs.length)];

      // Create credit card with random demo data
      const cardData = { ...randomConfig, userId };
      const creditCard = await CreditCardService.createCreditCard(cardData);

      res.status(201).json({
        success: true,
        message: 'Demo credit card created successfully',
        data: creditCard
      });
    } catch (error) {
      console.error('Error creating demo credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
