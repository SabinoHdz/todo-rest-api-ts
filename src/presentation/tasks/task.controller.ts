import { NextFunction, Request, Response } from "express";
import {
  AddTagDto,
  CreateTaskDto,
  GetKeyTagDto,
  GetKeyTaskDto,
  RemoveTagDto,
  TaskRepository,
  UpdateTaskDto,
} from "../../domain";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks = (req: Request, res: Response) => {
    this.taskRepository.findAll();
  };

  createTask = (req: Request, res: Response, next: NextFunction) => {
    const [err, createTaskDto] = CreateTaskDto.create(req.body);
    if (err) return res.status(400).json({ error: err });

    this.taskRepository
      .create(createTaskDto!)
      .then((createTask) => res.json(createTask))
      .catch((error) => next(error));
  };
  updateTask = (req: Request, res: Response, next: NextFunction) => {
    const [errorUpdate, updateTaskDto] = UpdateTaskDto.create(req.body);
    const [errorkey, getkeyTaskDto] = GetKeyTaskDto.create(req.query);

    if (errorkey) return res.status(400).json({ error: errorkey });
    if (errorUpdate) return res.status(400).json({ error: errorUpdate });
    console.log(updateTaskDto);

    this.taskRepository
      .update(getkeyTaskDto!, updateTaskDto!)
      .then((task) => res.json(task))
      .catch((error) => next(error));
  };
  //Todo:refactorizar con DTOs
  addTagToTask = (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const [errorTag, addTagDto] = AddTagDto.create(req.body);
    const [errorTask, getKeyTaskDto] = GetKeyTaskDto.create({ id: taskId });
    if (errorTag) return res.status(400).json({ error: errorTag });
    if (errorTask) return res.status(400).json({ error: errorTask });
    console.log({ id: taskId });
    console.log({ tag: addTagDto });
    //const addTag = this.taskRepository.addTagToTask(getKeyTaskDto!, addTagDto!);

    //res.json(addTag);
    this.taskRepository
      .addTagToTask(getKeyTaskDto!, addTagDto!)
      .then((addTagToTask) =>
        res.json({
          status: 200,
          title: "Agregar Tag",
          message: "Se agrego uno nuevo tag al task",
          task: addTagToTask,
        })
      )
      .catch((error) => next(error));
  };

  removeTagToTask = (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const [errorTag, removeTagDto] = RemoveTagDto.create(req.body);
    const [errorTask, getKeyTaskDto] = GetKeyTaskDto.create({ id: taskId });
    if (errorTag) return res.status(400).json({ error: errorTag });
    if (errorTask) return res.status(400).json({ error: errorTask });
    this.taskRepository
      .removeTagToTask(getKeyTaskDto!, removeTagDto!)
      .then((task) =>
        res.json({
          status: 200,
          title: "Eliminar Tag",
          message: "Se removio un tag de la task",
          task,
        })
      )
      .catch((error) => next(error));
  };
}
