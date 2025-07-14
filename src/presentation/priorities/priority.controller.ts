import { NextFunction, Request, Response } from "express";
import {
  CreatePriorityDto,
  GetKeyPriorityDto,
  PriorityRepository,
  UpdatePriorityDto,
} from "../../domain";
export class PriorityController {
  constructor(private readonly priorityRepository: PriorityRepository) {}

  getPriorities = (req: Request, res: Response, next: NextFunction) => {
    this.priorityRepository
      .findAll()
      .then((priorities) => res.json(priorities))
      .catch((error) => next(error));
  };

  createPriority = (req: Request, res: Response, next: NextFunction) => {
    const [err, createPriorityDto] = CreatePriorityDto.create(req.body);
    if (err) return res.status(400).json({ err });
    /*try {
      const priority = this.priorityRepository.create(createPriorityDto!);
      console.log("priority Saved: " + priority);

      res.json(priority);
    } catch (error) {
      console.log("error in controller :  " + error);
    }*/
    this.priorityRepository
      .create(createPriorityDto!)
      .then((priority) => res.json(priority))
      .catch((error) => {
        console.log({ error });
        next(error);
      });
  };
  updatePriority = (req: Request, res: Response, next: NextFunction) => {
    const [errId, getKeyPriorityDto] = GetKeyPriorityDto.create(req.query);
    const [errBody, updatePriorityDto] = UpdatePriorityDto.create(req.body);

    if (errId) return res.status(400).json({ error: errId });
    if (errBody) res.status(400).json({ error: errBody });

    this.priorityRepository
      .update(getKeyPriorityDto!, updatePriorityDto!)
      .then((priority) => res.json(priority))
      .catch((err) => next(err));
  };
}
