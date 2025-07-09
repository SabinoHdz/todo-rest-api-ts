import { Request, Response } from "express";

export class TagPropertyController {
  constructor() {}

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
