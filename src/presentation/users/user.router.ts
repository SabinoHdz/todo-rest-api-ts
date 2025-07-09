import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const taskController = new UserController();
    router.get("/", taskController.getUser);

    return router;
  }
}
