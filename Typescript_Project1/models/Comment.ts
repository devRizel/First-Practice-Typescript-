import { IComment, IUser } from "../interfaces";
import { generateId } from "../utils";

export class Comment implements IComment {
  id: number;
  author: IUser;
  content: string;
  createdAt: Date;

  constructor(author: IUser, content: string) {
    this.id = generateId();
    this.author = author;
    this.content = content;
    this.createdAt = new Date();
  }
}
