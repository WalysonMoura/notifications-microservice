import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { SendNotificationUseCase } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new SendNotificationUseCase(notificationsRepository);

    const { notification } = await sut.execute({
      category: 'social',
      content: 'This is a notification',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
