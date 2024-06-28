import { Injectable } from '@nestjs/common';

import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationsUseCaseRequest {
  recipientId: string;
}
interface GetRecipientNotificationsUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsUseCaseRequest): Promise<GetRecipientNotificationsUseCaseResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId({ recipientId });

    return {
      notifications,
    };
  }
}
