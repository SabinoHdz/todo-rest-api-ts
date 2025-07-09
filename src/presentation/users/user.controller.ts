import { Request, Response } from "express";

export class UserController {
  constructor() {}

  getUser = (req: Request, res: Response) => {
    res.send(" All users");
  };

  createUser = (req: Request, res: Response) => {
    res.send(" create users");
  };
  updateUser = (req: Request, res: Response) => {
    res.send("update task");
  };
}
