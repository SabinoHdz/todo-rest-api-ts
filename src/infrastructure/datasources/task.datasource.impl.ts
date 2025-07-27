import { TaskModel } from "../../data/mongo/models/task.model";
import {
  TaskDatasource,
  CreateTaskDto,
  TaskEntity,
  CustomError,
  GetKeyTaskDto,
  AddTagDto,
  RemoveTagDto,
} from "../../domain";

export class TaskDasourceImpl implements TaskDatasource {
  findAll() {
    return "";
  }
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      console.log("entro");

      const task = new TaskModel({
        ...createTaskDto,
      });
      await task.save();
      console.log({ mongo: task });

      const taskEntity = TaskEntity.mapperObject(task);
      console.log({ taskEntity });
      return taskEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(`${error}`);
    }
  }
  update() {
    throw new Error("Method not implemented.");
  }

  async addTagToTask(
    keyTask: GetKeyTaskDto,
    keyTag: AddTagDto
  ): Promise<TaskEntity> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        keyTask.id,
        { $addToSet: { tags: keyTag.id } },
        { new: true }
      ).populate("tags");
      if (!updatedTask) throw CustomError.notFound("Task not found");

      console.log(updatedTask);

      return TaskEntity.mapperObject(updatedTask);
    } catch (err) {
      throw CustomError.internalServer(`${err}`);
    }
  }

  async removeTagToTask(
    keyTask: GetKeyTaskDto,
    keyTag: RemoveTagDto
  ): Promise<TaskEntity> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        keyTask.id,
        { $pull: { tags: keyTag.id } },
        { new: true }
      ).populate("tags");
      if (!updatedTask) throw CustomError.notFound("Task not found");
      return TaskEntity.mapperObject(updatedTask);
    } catch (err) {
      throw CustomError.internalServer(`${err}`);
    }
  }
}
