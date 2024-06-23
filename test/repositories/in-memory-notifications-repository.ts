import { Notification } from '@/application/entities/notification';
import {
  CreateParams,
  FindByIdParams,
  NotificationRepository,
  SaveParams,
} from '@/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create({ notification }: CreateParams) {
    this.notifications.push(notification);
  }

  async findById({
    notificationId,
  }: FindByIdParams): Promise<Notification | null> {
    const notification = await this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save({ notification }: SaveParams): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
