import express from 'express';
import NotificationController from '../controllers/NotificationController';

const router = express.Router();

// User notification routes
router.get('/:userId', NotificationController.getUserNotifications);
router.get('/:userId/stats', NotificationController.getNotificationStats);
router.put('/:userId/mark-all-read', NotificationController.markAllAsRead);

// Individual notification routes
router.post('/', NotificationController.createNotification);
router.put('/:notificationId/read', NotificationController.markAsRead);
router.delete('/:notificationId', NotificationController.deleteNotification);

// Admin and utility routes
router.post('/admin/trigger-checks', NotificationController.triggerNotificationChecks);
router.get('/reference/types-priorities', NotificationController.getNotificationReference);

export default router;
