import { Router } from "express";
import { PriorityController } from "./priority.controller";
import {
  PriorityDatasourceImpl,
  PriorityRepositoryImpl,
} from "../../infrastructure";

export class PriorityTagRoutes {
  static get routes(): Router {
    const router = Router();
    //inyección de dependencias
    const priorityDatasource = new PriorityDatasourceImpl();
    const priorityRepository = new PriorityRepositoryImpl(priorityDatasource);
    const priorityController = new PriorityController(priorityRepository);
    router.get("/", priorityController.getPriorities);
    router.post("/", priorityController.createPriority);
    router.put("/", priorityController.updatePriority);

    return router;
  }
}
