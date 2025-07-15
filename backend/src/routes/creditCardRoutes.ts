import { Router } from 'express';
import { CreditCardController } from '../controllers/CreditCardController';

const router = Router();

// Credit card routes for specific user
router.post('/:userId/cards', CreditCardController.createCreditCard);
router.get('/:userId/cards', CreditCardController.getCreditCards);
router.post('/:userId/cards/demo', CreditCardController.createDemoCreditCard);

// Default user routes (userId = 1)
router.post('/cards', CreditCardController.createCreditCard);
router.get('/cards', CreditCardController.getCreditCards);

// Individual card operations
router.get('/cards/:cardId', CreditCardController.getCreditCard);
router.put('/cards/:cardId', CreditCardController.updateCreditCard);
router.post('/cards/:cardId/freeze', CreditCardController.freezeCard);
router.post('/cards/:cardId/unfreeze', CreditCardController.unfreezeCard);
router.post('/cards/:cardId/close', CreditCardController.closeCard);

// Transaction operations
router.post('/cards/:cardId/transactions/purchase', CreditCardController.simulatePurchase);
router.post('/cards/:cardId/transactions/refund', CreditCardController.simulateRefund);
router.get('/cards/:cardId/transactions', CreditCardController.getTransactions);
router.get('/cards/:cardId/transactions/stats', CreditCardController.getTransactionStats);

export default router;
