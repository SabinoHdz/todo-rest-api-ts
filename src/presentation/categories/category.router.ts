import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../../infrastructure";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryController = new CategoryController();
    router.get(
      "/",
      [AuthMiddleware.validateJwt],
      categoryController.getCategories
    );

    return router;
  }
}
