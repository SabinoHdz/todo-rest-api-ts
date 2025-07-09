import { Request, Response } from "express";

export class PriorityController {
  constructor() {}

  getPriorities = (req: Request, res: Response) => {
    res.send(" All status");
  };

  createPriority = (req: Request, res: Response) => {
    res.send(" create status");
  };
  updatePriority = (req: Request, res: Response) => {
    res.send("Create status");
  };
}
