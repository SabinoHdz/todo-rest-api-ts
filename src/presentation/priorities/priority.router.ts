import { Router } from "express";
import { PriorityController } from "./priority.controller";

export class PriorityTagRoutes {
  static get routes(): Router {
    const router = Router();

    const priorityController = new PriorityController();
    router.get("/", priorityController.getPriorities);

    return router;
  }
}
