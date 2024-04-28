import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsrRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsrRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
