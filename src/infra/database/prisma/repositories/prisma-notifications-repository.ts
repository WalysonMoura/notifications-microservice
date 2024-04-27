import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsrRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notifications.create({ data: raw });
  }

  findById({ notificationId }: FindByIdParams): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  countManyByRecipientId({
    recipientId,
  }: CountManyByRecipientIdParams): Promise<number> {
    throw new Error('Method not implemented.');
  }
  findManyByRecipientId({
    recipientId,
  }: FindManyByRecipientIdParams): Promise<Notification[]> {
    throw new Error('Method not implemented.');
  }
}
