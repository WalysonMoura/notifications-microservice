import { Notification } from '../entities/notification';

export interface CreateParams {
  notification: Notification;
}

export interface FindByIdParams {
  notificationId: string;
}

export interface FindManyByRecipientIdParams {
  recipientId: string;
}
export interface CuntManyByRecipientIdParams {
  recipientId: string;
}

export interface SaveParams {
  notification: Notification;
}

export abstract class NotificationRepository {
  abstract create({ notification }: CreateParams): Promise<void>;
  abstract findById({
    notificationId,
  }: FindByIdParams): Promise<Notification | null>;

  abstract findManyByRecipientId({}: FindManyByRecipientIdParams): Promise<
    Notification[]
  >;

  abstract countManyByRecipientId({
    recipientId,
  }: CuntManyByRecipientIdParams): Promise<number>;
  abstract save({ notification }: SaveParams): Promise<void>;
}
