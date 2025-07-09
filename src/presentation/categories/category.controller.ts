import { Request, Response } from "express";

export class CategoryController {
  constructor() {}

  getCategories = (req: Request, res: Response) => {
    res.send(" All Categories");
  };
}
