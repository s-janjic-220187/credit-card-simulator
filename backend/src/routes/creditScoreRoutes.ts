import express from 'express';
import CreditScoreController from '../controllers/CreditScoreController';

const router = express.Router();

// Credit score analysis routes
router.get('/:userId/analysis', CreditScoreController.getCreditScoreAnalysis);
router.get('/:userId/factors', CreditScoreController.getCreditScoreFactors);
router.get('/:userId/strategies', CreditScoreController.getCreditScoreStrategies);

// Credit score simulation routes
router.post('/:userId/simulate', CreditScoreController.simulateActionImpact);

// General credit score information routes
router.get('/ranges', CreditScoreController.getCreditScoreRanges);

export default router;
