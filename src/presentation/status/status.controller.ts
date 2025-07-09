import { Request, Response } from "express";

export class StatusController {
  constructor() {}

  getStatus = (req: Request, res: Response) => {
    res.send(" All status");
  };

  createStatus = (req: Request, res: Response) => {
    res.send(" create status");
  };
  updateStatus = (req: Request, res: Response) => {
    res.send("Create status");
  };
}
