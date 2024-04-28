import { NotificationsRepository } from '@application/repositories/notifications-repository';

import { NotificationNotFonud } from './errors/notifications-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}
type UnreadNotificationResponse = void;

export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new NotificationNotFonud();
    }

    await notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
