import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';

const router = Router();

// Profile routes
router.post('/:userId', ProfileController.createProfile);
router.get('/:userId', ProfileController.getProfile);
router.put('/:userId', ProfileController.updateProfile);
router.patch('/:userId', ProfileController.upsertProfile);
router.delete('/:userId', ProfileController.deleteProfile);

// Default user route (userId = 1)
router.post('/', ProfileController.createProfile);
router.get('/', ProfileController.getProfile);
router.put('/', ProfileController.updateProfile);
router.patch('/', ProfileController.upsertProfile);
router.delete('/', ProfileController.deleteProfile);

export default router;
