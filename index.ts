// Enums for Status and Priority
enum Status {
  Todo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

// Interfaces for Task, Project, and User
interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: IUser | null;
}

interface IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
}

// Utility function for generating unique IDs
function generateId(): number {
  return Math.floor(Math.random() * 10000);
}

// User class implementing IUser interface
class User implements IUser {
  id: number;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = generateId();
    this.name = name;
    this.email = email;
  }
}

// Task class implementing ITask interface
class Task implements ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: IUser | null;

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

  updateStatus(newStatus: Status) {
    this.status = newStatus;
  }

  updatePriority(newPriority: Priority) {
    this.priority = newPriority;
  }

  assignUser(user: IUser) {
    this.assignee = user;
  }
}

// Project class implementing IProject interface
class Project implements IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];

  constructor(name: string, description: string) {
    this.id = generateId();
    this.name = name;
    this.description = description;
    this.tasks = [];
  }

  addTask(task: ITask) {
    this.tasks.push(task);
  }

  removeTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  listTasks() {
    return this.tasks;
  }

  getTaskById(taskId: number): ITask | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }
}

// TaskManager class to manage users, tasks, and projects
class TaskManager {
  users: IUser[] = [];
  projects: IProject[] = [];

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

  createTask(
    projectId: number,
    title: string,
    description: string,
    priority: Priority = Priority.Medium
  ): ITask | undefined {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) {
      console.log("Project not found");
      return undefined;
    }

    const task = new Task(title, description, Status.Todo, priority);
    project.addTask(task);
    return task;
  }

  assignTaskToUser(taskId: number, userId: number, projectId: number) {
    const project = this.projects.find((p) => p.id === projectId);
    const user = this.users.find((u) => u.id === userId);

    if (project && user) {
      const task = project.getTaskById(taskId);
      if (task) {
        task.assignUser(user);
        console.log(`Task ${taskId} assigned to ${user.name}`);
      } else {
        console.log("Task not found");
      }
    } else {
      console.log("Project or User not found");
    }
  }

  updateTaskStatus(taskId: number, projectId: number, status: Status) {
    const project = this.projects.find((p) => p.id === projectId);

    if (project) {
      const task = project.getTaskById(taskId);
      if (task) {
        task.updateStatus(status);
        console.log(`Task ${taskId} status updated to ${status}`);
      } else {
        console.log("Task not found");
      }
    } else {
      console.log("Project not found");
    }
  }

  listProjects() {
    return this.projects;
  }

  listUsers() {
    return this.users;
  }
}

// Demonstration code
const taskManager = new TaskManager();

// Creating users
const user1 = taskManager.createUser("Alice", "alice@example.com");
const user2 = taskManager.createUser("Bob", "bob@example.com");

// Creating projects
const project1 = taskManager.createProject("Project Alpha", "Alpha Description");
const project2 = taskManager.createProject("Project Beta", "Beta Description");

// Creating tasks in project1
const task1 = taskManager.createTask(project1.id, "Task 1", "Description of Task 1", Priority.High);
const task2 = taskManager.createTask(project1.id, "Task 2", "Description of Task 2", Priority.Medium);

// Creating tasks in project2
const task3 = taskManager.createTask(project2.id, "Task 3", "Description of Task 3", Priority.Low);
const task4 = taskManager.createTask(project2.id, "Task 4", "Description of Task 4", Priority.High);

// Assign tasks to users
if (task1) taskManager.assignTaskToUser(task1.id, user1.id, project1.id);
if (task2) taskManager.assignTaskToUser(task2.id, user2.id, project1.id);

// Update task status
if (task1) taskManager.updateTaskStatus(task1.id, project1.id, Status.InProgress);
if (task2) taskManager.updateTaskStatus(task2.id, project1.id, Status.Done);

// Listing tasks in project1
console.log("Tasks in Project Alpha:");
console.log(project1.listTasks());

// Listing all projects and users
console.log("All Projects:");
console.log(taskManager.listProjects());

console.log("All Users:");
console.log(taskManager.listUsers());
  
