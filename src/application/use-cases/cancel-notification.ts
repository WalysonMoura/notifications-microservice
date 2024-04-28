import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

import { NotificationNotFonud } from './errors/notifications-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new NotificationNotFonud();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
