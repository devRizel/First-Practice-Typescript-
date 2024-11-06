import { IUser } from "../interfaces";
import { generateId } from "../utils";

export class User implements IUser {
  id: number;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = generateId();
    this.name = name;
    this.email = email;
  }
}
