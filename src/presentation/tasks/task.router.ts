import { Router } from "express";
import { TaskController } from "./task.controller";
import { TaskDasourceImpl, TaskRepositoryImpl } from "../../infrastructure";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();
    const taskDasource = new TaskDasourceImpl();
    const taskRepository = new TaskRepositoryImpl(taskDasource);
    const taskController = new TaskController(taskRepository);
    router.get("/", taskController.getTasks);
    router.post("/", taskController.createTask);
    router.patch("/:taskId/add", taskController.addTagToTask);
    router.patch("/:taskId/remove", taskController.removeTagToTask);

    return router;
  }
}
