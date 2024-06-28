import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationUseCaseRequest {
  notificationId: string;
}
type CancelNotificationUseCaseResponse = void;
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationUseCaseRequest): Promise<CancelNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new NotificationNotFound();
    }

    await notification.cancel();

    await this.notificationsRepository.save({ notification });
  }
}
