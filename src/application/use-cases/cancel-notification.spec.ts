import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { CancelNotificationUseCase } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new CancelNotificationUseCase(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create({ notification });

    await sut.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new CancelNotificationUseCase(notificationRepository);

    expect(async () => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
