import { Router } from "express";
import { PriorityController } from "./priority.controller";
import {
  AuthMiddleware,
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
    router.get(
      "/",
      [AuthMiddleware.validateJwt],
      priorityController.getPriorities
    );
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      priorityController.createPriority
    );
    router.put(
      "/",
      [AuthMiddleware.validateJwt],
      priorityController.updatePriority
    );

    return router;
  }
}
