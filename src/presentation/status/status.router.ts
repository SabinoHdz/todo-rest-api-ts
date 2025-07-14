import { Router } from "express";
import { StatusController } from "./status.controller";
import {
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
    router.post("/", statusController.createStatus);
    router.put("/", statusController.updateStatus);

    return router;
  }
}
