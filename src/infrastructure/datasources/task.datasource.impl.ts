import { TaskModel } from "../../data/mongo/models/task.model";
import {
  TaskDatasource,
  CreateTaskDto,
  TaskEntity,
  CustomError,
  GetKeyTaskDto,
  AddTagDto,
  RemoveTagDto,
  UpdateTaskDto,
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
  async update(
    keyTask: GetKeyTaskDto,
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskEntity> {
    const task = await TaskModel.findById(keyTask.id).lean();
    if (!task) throw CustomError.notFound("Task not found");
    const { id } = keyTask;
    const { tags, ...updateData } = updateTaskDto;
    const currentTags = (task.tags ?? []).map((id) => id.toString());
    const newTags = tags ?? [];

    //TODO:Refactorizar en un use case despues
    const currentSet = new Set(currentTags);
    const newSet = new Set(newTags);

    const tagsToAdd = newTags.filter((tag) => !currentSet.has(tag));
    const tagsToRemove = currentTags.filter((tag) => !newSet.has(tag));

    const totalChanges = tagsToAdd.length + tagsToRemove.length;

    const updateOps: any = { $set: { ...updateData } };

    if (totalChanges === 0) {
      console.log("no hay cambios en los tags");
    } else if (totalChanges <= 2) {
      console.log("se actualizaron algunos tags");

      if (tagsToAdd.length > 0) {
        await TaskModel.findByIdAndUpdate(id, {
          $addToSet: { tags: { $each: tagsToAdd } },
        });
      }

      if (tagsToRemove.length > 0) {
        await TaskModel.findByIdAndUpdate(id, {
          $pull: { tags: { $in: tagsToRemove } },
        });
      }
    } else {
      console.log("se actualizaron todos los tags");

      updateOps.$set.tags = newTags;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: { ...updateData, ...(totalChanges > 2 ? { tags: newTags } : {}) },
      },
      { new: true }
    ).populate("tags");
    if (!updatedTask) throw CustomError.notFound("Task not found after update");
    return TaskEntity.mapperObject(updatedTask);
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
