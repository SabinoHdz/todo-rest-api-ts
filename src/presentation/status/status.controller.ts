import { NextFunction, Request, Response } from "express";
import {
  CreateStatusDto,
  GetKeyStatusDto,
  StatusRepository,
  UpdateStatusDto,
} from "../../domain";

export class StatusController {
  constructor(private readonly statusRepository: StatusRepository) {}

  getStatus = (req: Request, res: Response, next: NextFunction) => {
    this.statusRepository
      .findAll()
      .then((statuses) => res.json(statuses))
      .catch((err) => next(err));
  };

  createStatus = (req: Request, res: Response, next: NextFunction) => {
    const [err, createStatusDto] = CreateStatusDto.create(req.body);

    if (err) return res.status(400).json({ error: err });
    this.statusRepository
      .create(createStatusDto!)
      .then((createStatus) => res.json(createStatus))
      .catch((errStatus) => next(errStatus));
  };
  updateStatus = (req: Request, res: Response, next: NextFunction) => {
    const [errId, getKeyStatusDto] = GetKeyStatusDto.create(req.query);
    const [errUpdate, updateStatusDto] = UpdateStatusDto.create(req.body);
    if (errId) return res.status(400).json({ error: errId });
    if (errUpdate) return res.status(400).json({ error: errUpdate });
    this.statusRepository
      .update(getKeyStatusDto!, updateStatusDto!)
      .then((updatestatus) => res.json(updatestatus))
      .catch((err) => next(err));
  };
}
