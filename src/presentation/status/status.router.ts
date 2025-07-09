import { Router } from "express";
import { StatusController } from "./status.controller";

export class StatusRoutes {
  static get routes(): Router {
    const router = Router();

    const statusController = new StatusController();
    router.get("/", statusController.getStatus);

    return router;
  }
}
