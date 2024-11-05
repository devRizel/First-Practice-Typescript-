import { IUser, IProject, ITask, IComment } from "../interfaces";
import { Status } from "../enums";
import { User } from "../models/User";
import { Task } from "../models/Task";
import { Project } from "../models/Project";
import { NotificationService } from "./NotificationService";
import { Comment } from "../models/Comment";

export class TaskManager {
  users: IUser[] = [];
  projects: IProject[] = [];
  notificationService = new NotificationService();

  createUser(name: string, email: string): IUser {
    const user = new User(name, email);
    this.users.push(user);
    return user;
  }

  createProject(name: string, description: string): IProject {
    const project = new Project(name, description);
    this.projects.push(project);
    return project;
  }

  createTask(projectId: number, title: string, description: string): ITask | undefined {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const task = new Task(title, description);
    project.tasks.push(task);
    return task;
  }

  assignTask(taskId: number, userId: number, projectId: number) {
    const project = this.projects.find(p => p.id === projectId);
    const user = this.users.find(u => u.id === userId);

    if (project && user) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.assignee = user;
        this.notificationService.sendNotification(user, `You have been assigned to task ${task.title}.`);
      }
    }
  }

  addComment(taskId: number, projectId: number, user: IUser, content: string) {
    const project = this.projects.find(p => p.id === projectId);
    const task = project?.tasks.find(t => t.id === taskId);

    if (task) {
      const comment = new Comment(user, content);
      task.addComment(comment);
    }
  }
}
