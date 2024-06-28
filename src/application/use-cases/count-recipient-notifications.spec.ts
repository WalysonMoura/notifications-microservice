import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { CountRecipientNotificationsUseCase } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new CountRecipientNotificationsUseCase(notificationRepository);

    await notificationRepository.create({
      notification: makeNotification({ recipientId: 'fake-recipient-id' }),
    });

    await notificationRepository.create({
      notification: makeNotification({ recipientId: 'fake-recipient-id' }),
    });

    await notificationRepository.create({
      notification: makeNotification({
        recipientId: 'another-fake-recipient-id',
      }),
    });

    const { count } = await sut.execute({ recipientId: 'fake-recipient-id' });

    expect(count).toBeGreaterThan(0);
    expect(count).toEqual(2);
  });
});
