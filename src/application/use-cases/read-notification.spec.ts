import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotificationUseCase } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new ReadNotificationUseCase(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create({ notification });

    await sut.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be to able a read not existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new ReadNotificationUseCase(notificationRepository);

    expect(async () => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
