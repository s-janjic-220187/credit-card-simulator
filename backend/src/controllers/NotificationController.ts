import { Request, Response } from 'express';
import NotificationService, { NotificationType, NotificationPriority } from '../services/NotificationService';

export class NotificationController {
  /**
   * Get notifications for a user
   */
  static async getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { 
        unreadOnly = 'false', 
        limit = '50', 
        offset = '0',
        type 
      } = req.query;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      const result = await NotificationService.getUserNotifications(userId, {
        unreadOnly: unreadOnly === 'true',
        limit: Number(limit),
        offset: Number(offset),
        type: type as NotificationType,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch notifications',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Create a new notification
   */
  static async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        type,
        priority = NotificationPriority.MEDIUM,
        title,
        message,
        metadata,
        scheduledFor,
        expiresAt,
      } = req.body;

      if (!userId || !type || !title || !message) {
        res.status(400).json({
          success: false,
          message: 'userId, type, title, and message are required',
        });
        return;
      }

      if (!Object.values(NotificationType).includes(type)) {
        res.status(400).json({
          success: false,
          message: 'Invalid notification type',
          validTypes: Object.values(NotificationType),
        });
        return;
      }

      if (!Object.values(NotificationPriority).includes(priority)) {
        res.status(400).json({
          success: false,
          message: 'Invalid notification priority',
          validPriorities: Object.values(NotificationPriority),
        });
        return;
      }

      const notification = await NotificationService.createNotification({
        userId,
        type,
        priority,
        title,
        message,
        metadata,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      });

      res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: notification,
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create notification',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Mark a notification as read
   */
  static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { notificationId } = req.params;
      const { userId } = req.body;

      if (!notificationId || !userId) {
        res.status(400).json({
          success: false,
          message: 'Notification ID and User ID are required',
        });
        return;
      }

      await NotificationService.markAsRead(notificationId, userId);

      res.status(200).json({
        success: true,
        message: 'Notification marked as read',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      await NotificationService.markAllAsRead(userId);

      res.status(200).json({
        success: true,
        message: 'All notifications marked as read',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark all notifications as read',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const { notificationId } = req.params;
      const { userId } = req.body;

      if (!notificationId || !userId) {
        res.status(400).json({
          success: false,
          message: 'Notification ID and User ID are required',
        });
        return;
      }

      await NotificationService.deleteNotification(notificationId, userId);

      res.status(200).json({
        success: true,
        message: 'Notification deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete notification',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get notification statistics for a user
   */
  static async getNotificationStats(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      // Get various notification statistics
      const result = await NotificationService.getUserNotifications(userId, {
        limit: 1000, // Get all notifications for stats
      });

      const stats = {
        total: result.total,
        unread: result.unreadCount,
        read: result.total - result.unreadCount,
        byType: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
        recent: result.notifications.slice(0, 5),
      };

      // Count by type and priority
      result.notifications.forEach((notification: any) => {
        stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;
        stats.byPriority[notification.priority] = (stats.byPriority[notification.priority] || 0) + 1;
      });

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error('Error getting notification stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get notification statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Trigger manual notification checks (admin function)
   */
  static async triggerNotificationChecks(_req: Request, res: Response): Promise<void> {
    try {
      await NotificationService.runNotificationChecks();

      res.status(200).json({
        success: true,
        message: 'Notification checks completed successfully',
      });
    } catch (error) {
      console.error('Error running notification checks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to run notification checks',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get notification types and priorities reference
   */
  static async getNotificationReference(_req: Request, res: Response): Promise<void> {
    try {
      const reference = {
        types: Object.values(NotificationType).map(type => ({
          value: type,
          description: this.getTypeDescription(type),
        })),
        priorities: Object.values(NotificationPriority).map(priority => ({
          value: priority,
          description: this.getPriorityDescription(priority),
        })),
      };

      res.status(200).json({
        success: true,
        data: reference,
      });
    } catch (error) {
      console.error('Error getting notification reference:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get notification reference',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get description for notification type
   */
  private static getTypeDescription(type: NotificationType): string {
    switch (type) {
      case NotificationType.PAYMENT_DUE:
        return 'Payment due date approaching';
      case NotificationType.PAYMENT_OVERDUE:
        return 'Payment is past due';
      case NotificationType.HIGH_UTILIZATION:
        return 'Credit utilization is high';
      case NotificationType.CREDIT_LIMIT_EXCEEDED:
        return 'Credit limit has been exceeded';
      case NotificationType.STATEMENT_READY:
        return 'Monthly statement is available';
      case NotificationType.UNUSUAL_ACTIVITY:
        return 'Unusual account activity detected';
      case NotificationType.CREDIT_SCORE_CHANGE:
        return 'Credit score has changed';
      case NotificationType.PROMOTIONAL:
        return 'Promotional offer or update';
      case NotificationType.SECURITY_ALERT:
        return 'Security-related alert';
      default:
        return 'General notification';
    }
  }

  /**
   * Get description for notification priority
   */
  private static getPriorityDescription(priority: NotificationPriority): string {
    switch (priority) {
      case NotificationPriority.LOW:
        return 'Low priority - informational';
      case NotificationPriority.MEDIUM:
        return 'Medium priority - normal attention';
      case NotificationPriority.HIGH:
        return 'High priority - requires attention';
      case NotificationPriority.URGENT:
        return 'Urgent - immediate action required';
      default:
        return 'Standard priority';
    }
  }
}

export default NotificationController;
