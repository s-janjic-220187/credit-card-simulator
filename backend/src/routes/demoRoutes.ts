import { Router } from 'express';
import { DemoController } from '../controllers/DemoController';

const router = Router();

// Create demo data
router.post('/create', DemoController.createDemoData);

// Reset demo data
router.post('/reset', DemoController.resetDemoData);

export default router;
