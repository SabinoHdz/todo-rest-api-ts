import { Request, Response } from "express";

export class TaskController {
  constructor() {}

  getTasks = (req: Request, res: Response) => {
    res.send(" All task");
  };

  createTask = (req: Request, res: Response) => {
    res.send(" create task");
  };
  updateTask = (req: Request, res: Response) => {
    res.send("update task");
  };
}
