import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// User authentication routes
router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);
router.get('/users/:id', UserController.getUserById);
router.get('/users/:id/profile', UserController.getUserProfile);

export default router;
