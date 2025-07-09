import { Router } from "express";
import { CategoryRoutes } from "./categories";
import { StatusRoutes } from "./status";
import { PriorityTagRoutes } from "./priorities";
import { TagsRoutes } from "./tags";
import { TaskRoutes } from "./tasks";
import { UserRoutes } from "./users";

export class AppRouter {
  static get routes(): Router {
    const baseRouter = Router();
    baseRouter.use("/api/v1", AppRouter.getAllRoutes());
    return baseRouter;
  }

  private static getAllRoutes = (): Router => {
    const router = Router();
    router.use("/category", CategoryRoutes.routes);
    router.use("/status", StatusRoutes.routes);
    router.use("/priority", PriorityTagRoutes.routes);
    router.use("/tags", TagsRoutes.routes);
    router.use("/tasks", TaskRoutes.routes);
    router.use("/users", UserRoutes.routes);

    return router;
  };
}
