import { Router } from "express";
import { TaskController } from "./task.controller";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskController = new TaskController();
    router.get("/", taskController.getTasks);

    return router;
  }
}
