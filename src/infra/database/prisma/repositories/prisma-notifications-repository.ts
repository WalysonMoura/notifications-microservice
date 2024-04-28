import { Notification } from '@application/entities/notification';
import {
  CountManyByRecipientIdParams,
  FindByIdParams,
  FindManyByRecipientIdParams,
  NotificationsRepository,
} from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsrRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notifications.create({ data: raw });
  }

  async findById({
    notificationId,
  }: FindByIdParams): Promise<Notification | null> {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notifications.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async countManyByRecipientId({
    recipientId,
  }: CountManyByRecipientIdParams): Promise<number> {
    const count = await this.prisma.notifications.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId({
    recipientId,
  }: FindManyByRecipientIdParams): Promise<Notification[]> {
    const notifications = await this.prisma.notifications.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
