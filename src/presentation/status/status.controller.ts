import { Request, Response } from "express";
import { StatusRepository } from "../../domain";

export class StatusController {
  constructor(private readonly statusRepository: StatusRepository) {}

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
