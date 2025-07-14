import { Request, Response } from "express";
import { TagRepository } from "../../domain";

export class TagPropertyController {
  constructor(private readonly tagRepository: TagRepository) {}

  getTags = (req: Request, res: Response) => {
    res.send(" All tags");
  };

  createTag = (req: Request, res: Response) => {
    res.send(" create tags");
  };
  updateTag = (req: Request, res: Response) => {
    res.send("update tag");
  };
}
