/**
 * Admin Controller
 * 
 * Handles admin-specific operations including user management,
 * system monitoring, and administrative functions.
 * 
 * Features:
 * - User management (view, edit, delete users)
 * - Credit card management across all users
 * - System statistics and monitoring
 * - Administrative data access
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminController {
  /**
   * Get all users with their profiles and cards
   */
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          creditCards: {
            include: {
              transactions: {
                orderBy: { date: 'desc' },
                take: 5 // Last 5 transactions per card
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users'
      });
    }
  }

  /**
   * Get detailed user information by ID
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
          creditCards: {
            include: {
              transactions: {
                orderBy: { date: 'desc' }
              }
            }
          }
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user'
      });
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const profileData = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Update or create profile
      const updatedProfile = await prisma.userProfile.upsert({
        where: { userId: userId },
        update: profileData,
        create: {
          userId: userId,
          ...profileData
        }
      });

      res.json({
        success: true,
        data: updatedProfile
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user profile'
      });
    }
  }

  /**
   * Delete user account
   */
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      // Check if user exists and is not admin
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      if (user.role === 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'Cannot delete admin user'
        });
        return;
      }

      // Delete user (cascade will handle related records)
      await prisma.user.delete({
        where: { id: userId }
      });

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      });
    }
  }

  /**
   * Get system statistics
   */
  static async getSystemStats(_req: Request, res: Response): Promise<void> {
    try {
      const [
        totalUsers,
        totalCards,
        totalTransactions,
        recentUsers,
        totalTransactionValue
      ] = await Promise.all([
        prisma.user.count({ where: { role: 'USER' } }),
        prisma.creditCard.count(),
        prisma.transaction.count(),
        prisma.user.count({
          where: {
            role: 'USER',
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }),
        prisma.transaction.aggregate({
          _sum: { totalAmount: true }
        })
      ]);

      res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            recentlyCreated: recentUsers
          },
          cards: {
            total: totalCards
          },
          transactions: {
            total: totalTransactions,
            totalValue: totalTransactionValue._sum.totalAmount || 0
          }
        }
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch system statistics'
      });
    }
  }

  /**
   * Get all credit cards across all users
   */
  static async getAllCreditCards(_req: Request, res: Response): Promise<void> {
    try {
      const creditCards = await prisma.creditCard.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          transactions: {
            orderBy: { date: 'desc' },
            take: 3
          }
        },
        orderBy: { issueDate: 'desc' }
      });

      res.json({
        success: true,
        data: creditCards
      });
    } catch (error) {
      console.error('Error fetching credit cards:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch credit cards'
      });
    }
  }

  /**
   * Update credit card information
   */
  static async updateCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const cardData = req.body;

      const updatedCard = await prisma.creditCard.update({
        where: { id: cardId },
        data: cardData,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      });

      res.json({
        success: true,
        data: updatedCard
      });
    } catch (error) {
      console.error('Error updating credit card:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update credit card'
      });
    }
  }

  /**
   * Get recent transactions across all users
   */
  static async getRecentTransactions(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 50;

      const transactions = await prisma.transaction.findMany({
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          creditCard: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      res.json({
        success: true,
        data: transactions
      });
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch recent transactions'
      });
    }
  }
}
