import { NextFunction, Request, Response } from "express";
import {
  CreateTagDto,
  GetKeyTagDto,
  TagRepository,
  UpdateTagDto,
} from "../../domain";

export class TagPropertyController {
  constructor(private readonly tagRepository: TagRepository) {}

  getTags = (req: Request, res: Response, next: NextFunction) => {
    this.tagRepository
      .findAll()
      .then((tags) => res.json(tags))
      .catch((err) => next(err));
  };

  createTag = (req: Request, res: Response, next: NextFunction) => {
    const [err, createTagDto] = CreateTagDto.create(req.body);

    if (err) return res.status(400).json({ error: err });
    this.tagRepository
      .create(createTagDto!)
      .then((createTag) => res.json(createTag))
      .catch((err) => next(err));
  };
  updateTag = (req: Request, res: Response, next: NextFunction) => {
    const [errId, getKeyTagDto] = GetKeyTagDto.create(req.query);
    const [errUpdate, updateTagDto] = UpdateTagDto.create(req.body);

    if (errId) return res.status(400).json({ error: errId });
    if (errUpdate) return res.status(400).json({ error: errUpdate });
    this.tagRepository
      .update(getKeyTagDto!, updateTagDto!)
      .then((updatedTag) => res.json(updatedTag))
      .catch((err) => next(err));
  };
}
