import { Router } from 'express';
import BillingController from '../controllers/BillingController';

const router = Router();

// Billing cycle routes
router.post('/cycle/:cardId', BillingController.generateBillingCycle);
router.get('/cycles/:cardId', BillingController.getBillingCycles);
router.get('/cycle/:cycleId', BillingController.getBillingCycle);

// Statement generation
router.post('/statement/:cycleId', BillingController.generateStatement);

// Calculation routes
router.get('/calculate/interest/:cardId', BillingController.calculateInterest);
router.get('/calculate/fees/:cardId', BillingController.calculateFees);
router.get('/calculate/minimum-payment/:cardId', BillingController.calculateMinimumPayment);
router.get('/calculate/payoff/:cardId', BillingController.calculatePayoffScenarios);

export default router;
