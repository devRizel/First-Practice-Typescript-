import { IUser, INotification } from "../interfaces";
import { NotificationType } from "../enums";
import { generateId } from "../utils";

export class NotificationService {
  notifications: INotification[] = [];

  sendNotification(recipient: IUser, message: string) {
    const notification: INotification = {
      id: generateId(),
      type: NotificationType.TaskAssigned,
      recipient,
      message,
      createdAt: new Date(),
    };
    this.notifications.push(notification);
    console.log(`Notification sent to ${recipient.name}: ${message}`);
  }

  getUserNotifications(userId: number): INotification[] {
    return this.notifications.filter(n => n.recipient.id === userId);
  }
}
