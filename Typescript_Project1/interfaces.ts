import { Status, Priority, NotificationType } from "./enums";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: IUser | null;
  comments: IComment[];
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
}

export interface IComment {
  id: number;
  author: IUser;
  content: string;
  createdAt: Date;
}

export interface INotification {
  id: number;
  type: NotificationType;
  recipient: IUser;
  message: string;
  createdAt: Date;
}
