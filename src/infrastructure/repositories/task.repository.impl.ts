import {
  AddTagDto,
  CreateTaskDto,
  GetKeyTaskDto,
  RemoveTagDto,
  TaskDatasource,
  TaskEntity,
  TaskRepository,
  UpdateTaskDto,
} from "../../domain";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly taskDatasource: TaskDatasource) {}

  findAll() {
    return this.taskDatasource.findAll();
  }
  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskDatasource.create(createTaskDto);
  }
  update(
    keyTask: GetKeyTaskDto,
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskEntity> {
    return this.taskDatasource.update(keyTask, updateTaskDto);
  }

  addTagToTask(keyTask: GetKeyTaskDto, keyTag: AddTagDto) {
    return this.taskDatasource.addTagToTask(keyTask, keyTag);
  }

  removeTagToTask(keyTask: GetKeyTaskDto, keyTag: RemoveTagDto) {
    return this.taskDatasource.removeTagToTask(keyTask, keyTag);
  }
}
