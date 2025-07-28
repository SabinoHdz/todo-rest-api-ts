import { AddTagDto } from "../dtos/task/add-tag.dto";
import { CreateTaskDto } from "../dtos/task/create-task.dto";
import { GetKeyTaskDto } from "../dtos/task/get-key-task.dto";
import { RemoveTagDto } from "../dtos/task/remove-tag.dto";
import { TaskEntity } from "../entities/task-entity";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
export abstract class TaskRepository {
  abstract findAll(): any;
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
  abstract update(
    keyTask: GetKeyTaskDto,
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskEntity>;

  //todo:refactorizar con DTO y entity
  abstract addTagToTask(
    keyTask: GetKeyTaskDto,
    keyTag: AddTagDto
  ): Promise<TaskEntity>;
  //todo:refactorizar con DTO y entity
  abstract removeTagToTask(
    keyTask: GetKeyTaskDto,
    keyTag: RemoveTagDto
  ): Promise<TaskEntity>;
}
