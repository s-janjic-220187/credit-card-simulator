import prisma from '../lib/prisma';

export enum NotificationType {
  PAYMENT_DUE = 'PAYMENT_DUE',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  HIGH_UTILIZATION = 'HIGH_UTILIZATION',
  CREDIT_LIMIT_EXCEEDED = 'CREDIT_LIMIT_EXCEEDED',
  STATEMENT_READY = 'STATEMENT_READY',
  UNUSUAL_ACTIVITY = 'UNUSUAL_ACTIVITY',
  CREDIT_SCORE_CHANGE = 'CREDIT_SCORE_CHANGE',
  PROMOTIONAL = 'PROMOTIONAL',
  SECURITY_ALERT = 'SECURITY_ALERT',
}

export enum NotificationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface NotificationData {
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  scheduledFor?: Date;
  expiresAt?: Date;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

class NotificationService {
  /**
   * Create a new notification
   */
  static async createNotification(data: NotificationData): Promise<any> {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId: data.userId,
          type: data.type,
          priority: data.priority,
          title: data.title,
          message: data.message,
          metadata: data.metadata || {},
          scheduledFor: data.scheduledFor || new Date(),
          expiresAt: data.expiresAt,
          isRead: false,
          isDelivered: false,
        },
      });

      // Process immediate delivery
      if (!data.scheduledFor || data.scheduledFor <= new Date()) {
        await this.deliverNotification(notification.id);
      }

      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Get notifications for a user
   */
  static async getUserNotifications(
    userId: string,
    options: {
      unreadOnly?: boolean;
      limit?: number;
      offset?: number;
      type?: NotificationType;
    } = {}
  ) {
    const {
      unreadOnly = false,
      limit = 50,
      offset = 0,
      type,
    } = options;

    const whereClause: any = { userId };
    
    if (unreadOnly) {
      whereClause.isRead = false;
    }
    
    if (type) {
      whereClause.type = type;
    }

    const notifications = await prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.notification.count({
      where: whereClause,
    });

    return {
      notifications,
      total,
      unreadCount: await prisma.notification.count({
        where: { userId, isRead: false },
      }),
    };
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string, userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId: userId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsRead(userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        userId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string, userId: string): Promise<void> {
    await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId: userId,
      },
    });
  }

  /**
   * Check for and create payment due notifications
   */
  static async checkPaymentDueNotifications(): Promise<void> {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

    // Find credit cards with upcoming due dates
    const creditCards = await prisma.creditCard.findMany({
      where: {
        AND: [
          { nextDueDate: { lte: threeDaysFromNow } },
          { nextDueDate: { gte: new Date() } },
          { status: 'ACTIVE' },
        ],
      },
      include: { user: true },
    });

    for (const card of creditCards) {
      const daysUntilDue = Math.ceil(
        (card.nextDueDate!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );

      // Check if notification already exists
      const existingNotification = await prisma.notification.findFirst({
        where: {
          userId: card.userId,
          type: NotificationType.PAYMENT_DUE,
          metadata: {
            path: ['cardId'],
            equals: card.id,
          },
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      if (!existingNotification) {
        let priority = NotificationPriority.MEDIUM;
        if (daysUntilDue <= 1) priority = NotificationPriority.HIGH;
        if (daysUntilDue === 0) priority = NotificationPriority.URGENT;

        await this.createNotification({
          userId: card.userId,
          type: NotificationType.PAYMENT_DUE,
          priority,
          title: `Payment Due ${daysUntilDue === 0 ? 'Today' : `in ${daysUntilDue} day${daysUntilDue === 1 ? '' : 's'}`}`,
          message: `Your credit card payment of $${card.minimumPayment.toFixed(2)} is due ${card.nextDueDate!.toLocaleDateString()}`,
          metadata: {
            cardId: card.id,
            dueDate: card.nextDueDate,
            minimumPayment: card.minimumPayment,
          },
        });
      }
    }
  }

  /**
   * Check for and create high utilization notifications
   */
  static async checkHighUtilizationNotifications(): Promise<void> {
    const creditCards = await prisma.creditCard.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: { user: true },
    });

    for (const card of creditCards) {
      const utilization = (card.currentBalance / card.creditLimit) * 100;

      if (utilization >= 80) {
        // Check if notification already exists in the last 7 days
        const existingNotification = await prisma.notification.findFirst({
          where: {
            userId: card.userId,
            type: NotificationType.HIGH_UTILIZATION,
            metadata: {
              path: ['cardId'],
              equals: card.id,
            },
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        });

        if (!existingNotification) {
          let priority = NotificationPriority.MEDIUM;
          if (utilization >= 95) priority = NotificationPriority.HIGH;
          if (utilization >= 100) priority = NotificationPriority.URGENT;

          await this.createNotification({
            userId: card.userId,
            type: NotificationType.HIGH_UTILIZATION,
            priority,
            title: 'High Credit Utilization Alert',
            message: `Your credit card is ${utilization.toFixed(1)}% utilized. Consider paying down the balance to improve your credit score.`,
            metadata: {
              cardId: card.id,
              utilization: utilization,
              currentBalance: card.currentBalance,
              creditLimit: card.creditLimit,
            },
          });
        }
      }
    }
  }

  /**
   * Check for and create overlimit notifications
   */
  static async checkOverlimitNotifications(): Promise<void> {
    const creditCards = await prisma.creditCard.findMany({
      where: {
        currentBalance: { gt: prisma.creditCard.fields.creditLimit },
        status: 'ACTIVE',
      },
      include: { user: true },
    });

    for (const card of creditCards) {
      // Check if notification already exists in the last 24 hours
      const existingNotification = await prisma.notification.findFirst({
        where: {
          userId: card.userId,
          type: NotificationType.CREDIT_LIMIT_EXCEEDED,
          metadata: {
            path: ['cardId'],
            equals: card.id,
          },
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      if (!existingNotification) {
        const overAmount = card.currentBalance - card.creditLimit;

        await this.createNotification({
          userId: card.userId,
          type: NotificationType.CREDIT_LIMIT_EXCEEDED,
          priority: NotificationPriority.URGENT,
          title: 'Credit Limit Exceeded',
          message: `Your credit card balance ($${card.currentBalance.toFixed(2)}) has exceeded your credit limit ($${card.creditLimit.toFixed(2)}) by $${overAmount.toFixed(2)}.`,
          metadata: {
            cardId: card.id,
            currentBalance: card.currentBalance,
            creditLimit: card.creditLimit,
            overAmount: overAmount,
          },
        });
      }
    }
  }

  /**
   * Create statement ready notification
   */
  static async createStatementNotification(statementId: string): Promise<void> {
    const statement = await prisma.statement.findUnique({
      where: { id: statementId },
      include: { creditCard: true },
    });

    if (!statement) return;

    await this.createNotification({
      userId: statement.creditCard.userId,
      type: NotificationType.STATEMENT_READY,
      priority: NotificationPriority.MEDIUM,
      title: 'Statement Ready',
      message: `Your credit card statement for ${statement.billingPeriodStart.toLocaleDateString()} - ${statement.billingPeriodEnd.toLocaleDateString()} is now available.`,
      metadata: {
        statementId: statement.id,
        cardId: statement.creditCardId,
        totalBalance: statement.totalBalance,
        minimumPayment: statement.minimumPayment,
        dueDate: statement.dueDate,
      },
    });
  }

  /**
   * Deliver notification (simulate sending email, SMS, push, etc.)
   */
  private static async deliverNotification(notificationId: string): Promise<void> {
    try {
      // In a real implementation, this would:
      // 1. Get user notification preferences
      // 2. Send email, SMS, push notification based on preferences
      // 3. Update delivery status

      // For now, just mark as delivered
      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          isDelivered: true,
          deliveredAt: new Date(),
        },
      });

      console.log(`Notification ${notificationId} delivered`);
    } catch (error) {
      console.error(`Error delivering notification ${notificationId}:`, error);
    }
  }

  /**
   * Process scheduled notifications
   */
  static async processScheduledNotifications(): Promise<void> {
    const scheduledNotifications = await prisma.notification.findMany({
      where: {
        isDelivered: false,
        scheduledFor: { lte: new Date() },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    });

    for (const notification of scheduledNotifications) {
      await this.deliverNotification(notification.id);
    }
  }

  /**
   * Clean up expired notifications
   */
  static async cleanupExpiredNotifications(): Promise<void> {
    await prisma.notification.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }

  /**
   * Run all notification checks (to be called periodically)
   */
  static async runNotificationChecks(): Promise<void> {
    try {
      await Promise.all([
        this.checkPaymentDueNotifications(),
        this.checkHighUtilizationNotifications(),
        this.checkOverlimitNotifications(),
        this.processScheduledNotifications(),
        this.cleanupExpiredNotifications(),
      ]);
    } catch (error) {
      console.error('Error running notification checks:', error);
    }
  }
}

export default NotificationService;
