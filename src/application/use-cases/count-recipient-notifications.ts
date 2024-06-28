import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}
interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationRepository.countManyByRecipientId({
      recipientId,
    });

    return { count };
  }
}
