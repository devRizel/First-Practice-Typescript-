import { TaskManager } from "./services/TaskManager";
import { Status } from "./enums";

const taskManager = new TaskManager();

const alice = taskManager.createUser("Alice", "alice@example.com");
const project1 = taskManager.createProject("Project Alpha", "Alpha Description");

const task1 = taskManager.createTask(project1.id, "Task 1", "Description of Task 1");
if (task1) {
  taskManager.assignTask(task1.id, alice.id, project1.id);
  taskManager.addComment(task1.id, project1.id, alice, "This is my first comment on this task.");
}

console.log("Project tasks:", project1.tasks);
console.log("Notifications for Alice:", taskManager.notificationService.getUserNotifications(alice.id));
