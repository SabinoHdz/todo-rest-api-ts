import { Router } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryController = new CategoryController();
    router.get("/", categoryController.getCategories);

    return router;
  }
}
