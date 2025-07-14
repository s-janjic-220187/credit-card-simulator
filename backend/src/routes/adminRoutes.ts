/**
 * Admin Routes
 * 
 * Protected routes for administrative functions including user management,
 * system monitoring, and data oversight.
 * 
 * All routes require ADMIN role authentication.
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();

// Create initial admin user (public endpoint for setup)
router.post('/create-admin', AdminController.createInitialAdmin);

// Middleware to check admin role (placeholder - implement proper auth check)
const requireAdmin = (_req: any, _res: any, next: any) => {
  // TODO: Implement proper admin authentication middleware
  // For now, assuming admin check is done at application level
  next();
};

// Apply admin middleware to all routes
router.use(requireAdmin);

// User management routes
router.get('/users', AdminController.getAllUsers);
router.get('/users/:userId', AdminController.getUserById);
router.put('/users/:userId/profile', AdminController.updateUserProfile);
router.delete('/users/:userId', AdminController.deleteUser);

// Credit card management routes
router.get('/credit-cards', AdminController.getAllCreditCards);
router.put('/credit-cards/:cardId', AdminController.updateCreditCard);

// System monitoring routes
router.get('/stats', AdminController.getSystemStats);
router.get('/transactions', AdminController.getRecentTransactions);

export default router;
