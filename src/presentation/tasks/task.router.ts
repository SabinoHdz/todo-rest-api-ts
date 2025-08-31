import { Router } from "express";
import { TaskController } from "./task.controller";
import {
  AuthMiddleware,
  TaskDasourceImpl,
  TaskRepositoryImpl,
} from "../../infrastructure";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();
    const taskDasource = new TaskDasourceImpl();
    const taskRepository = new TaskRepositoryImpl(taskDasource);
    const taskController = new TaskController(taskRepository);
    router.get("/", [AuthMiddleware.validateJwt], taskController.getTasks);
    router.post("/", [AuthMiddleware.validateJwt], taskController.createTask);
    router.put("/", [AuthMiddleware.validateJwt], taskController.updateTask);
    router.patch(
      "/:taskId/add",
      [AuthMiddleware.validateJwt],
      taskController.addTagToTask
    );
    router.patch(
      "/:taskId/remove",
      [AuthMiddleware.validateJwt],
      taskController.removeTagToTask
    );

    return router;
  }
}
