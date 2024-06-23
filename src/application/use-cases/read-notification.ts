import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationUseCaseRequest {
  notificationId: string;
}

type ReadNotificationUseCaseResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new NotificationNotFound();
    }

    await notification.read();

    await this.notificationsRepository.save({ notification });
  }
}
