import { Router } from "express";
import { StatusController } from "./status.controller";
import {
  AuthMiddleware,
  StatusDatasoruceImpl,
  StatusRepositoryImpl,
} from "../../infrastructure";

export class StatusRoutes {
  static get routes(): Router {
    const router = Router();
    const statusDasource = new StatusDatasoruceImpl();
    const statusRepository = new StatusRepositoryImpl(statusDasource);
    const statusController = new StatusController(statusRepository);
    router.get("/", statusController.getStatus);
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      statusController.createStatus
    );
    router.put(
      "/",
      [AuthMiddleware.validateJwt],
      statusController.updateStatus
    );

    return router;
  }
}
