import { Notification } from '../entities/notification';
import { Content } from '../entities/value-objects/content';
import { NotificationRepository } from '../repositories/notifications-repository';

interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationUseCaseResponse {
  notification: Notification;
}

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    category,
    content,
    recipientId,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create({ notification });

    return {
      notification,
    };
  }
}
