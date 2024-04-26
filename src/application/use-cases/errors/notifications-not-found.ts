export class NotificationNotFonud extends Error {
  constructor() {
    super('Notification not found.');
  }
}
