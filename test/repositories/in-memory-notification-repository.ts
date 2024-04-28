import { Notification } from '@application/entities/notification';
import {
  CountManyByRecipientIdParams,
  FindByIdParams,
  FindManyByRecipientIdParams,
  NotificationsRepository,
} from '@application/repositories/notifications-repository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById({
    notificationId,
  }: FindByIdParams): Promise<Notification | null> {
    const notification = await this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = await this.notifications.findIndex(
      (notificationItem) => notificationItem.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId({
    recipientId,
  }: CountManyByRecipientIdParams): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientId({
    recipientId,
  }: FindManyByRecipientIdParams): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
