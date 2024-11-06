import { ITask, IComment, IUser } from "../interfaces";
import { Status, Priority } from "../enums";
import { generateId } from "../utils";

export class Task implements ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: IUser | null;
  comments: IComment[] = [];

  constructor(
    title: string,
    description: string,
    status: Status = Status.Todo,
    priority: Priority = Priority.Medium,
    assignee: IUser | null = null
  ) {
    this.id = generateId();
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.assignee = assignee;
  }

  addComment(comment: IComment) {
    this.comments.push(comment);
  }

  updateStatus(newStatus: Status) {
    this.status = newStatus;
  }
}
