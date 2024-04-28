import { NotificationsRepository } from '@application/repositories/notifications-repository';


interface ReadNotificationRequest {
    notificationId:string

}

type ReadNotificationResponse = void

export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
}
