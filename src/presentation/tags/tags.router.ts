import { Router } from "express";
import { TagPropertyController } from "./tags.controller";
import { TagDatasourceImpl, TagRepositoryImpl } from "../../infrastructure";

export class TagsRoutes {
  static get routes(): Router {
    const router = Router();
    const tagDatosurce = new TagDatasourceImpl();
    const tagRepository = new TagRepositoryImpl(tagDatosurce);
    const tagsController = new TagPropertyController(tagRepository);
    router.get("/", tagsController.getTags);
    router.post("/", tagsController.createTag);
    router.put("/", tagsController.updateTag);

    return router;
  }
}
