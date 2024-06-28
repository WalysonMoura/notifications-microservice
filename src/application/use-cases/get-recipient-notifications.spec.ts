import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { GetRecipientNotificationsUseCase } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to get recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sut = new GetRecipientNotificationsUseCase(notificationRepository);

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
    const { notifications } = await sut.execute({
      recipientId: 'fake-recipient-id',
    });

    expect(notifications).toBeTruthy();
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'fake-recipient-id' }),
        expect.objectContaining({ recipientId: 'fake-recipient-id' }),
      ]),
    );
  });
});
