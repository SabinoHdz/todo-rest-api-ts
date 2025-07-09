import { Router } from "express";
import { TagPropertyController } from "./tags.controller";

export class TagsRoutes {
  static get routes(): Router {
    const router = Router();

    const tagsController = new TagPropertyController();
    router.get("/", tagsController.getTags);

    return router;
  }
}
