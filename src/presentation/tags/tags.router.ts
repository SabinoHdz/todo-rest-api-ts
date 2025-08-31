import { Router } from "express";
import { TagPropertyController } from "./tags.controller";
import {
  AuthMiddleware,
  TagDatasourceImpl,
  TagRepositoryImpl,
} from "../../infrastructure";

export class TagsRoutes {
  static get routes(): Router {
    const router = Router();
    const tagDatosurce = new TagDatasourceImpl();
    const tagRepository = new TagRepositoryImpl(tagDatosurce);
    const tagsController = new TagPropertyController(tagRepository);
    router.get("/", [AuthMiddleware.validateJwt], tagsController.getTags);
    router.post("/", [AuthMiddleware.validateJwt], tagsController.createTag);
    router.put("/", [AuthMiddleware.validateJwt], tagsController.updateTag);

    return router;
  }
}
