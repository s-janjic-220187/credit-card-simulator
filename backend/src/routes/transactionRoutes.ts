import express from 'express';
import TransactionController from '../controllers/TransactionController';

const router = express.Router();

// Transaction simulation routes
router.post('/:cardId/simulate', TransactionController.simulateTransaction);
router.post('/:cardId/simulate-cycle', TransactionController.simulateBillingCycleTransactions);

// Transaction history and analytics routes
router.get('/:cardId/history', TransactionController.getTransactionHistory);
router.get('/:cardId/analytics', TransactionController.getTransactionAnalytics);

// Transaction impact simulation (preview without executing)
router.get('/:cardId/impact', TransactionController.getTransactionImpact);

export default router;
