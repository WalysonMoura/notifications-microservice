import { Notification } from '@application/entities/notification';

export interface FindByIdParams {
  notificationId: string;
}

export interface CountManyByRecipientIdParams {
  recipientId: string;
}

export interface FindManyByRecipientIdParams {
  recipientId: string;
}

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;

  abstract findById({
    notificationId,
  }: FindByIdParams): Promise<Notification | null>;

  abstract save(notification: Notification): Promise<void>;

  abstract countManyByRecipientId({
    recipientId,
  }: CountManyByRecipientIdParams): Promise<number>;

  abstract findManyByRecipientId({
    recipientId,
  }: FindManyByRecipientIdParams): Promise<Notification[]>;
}
