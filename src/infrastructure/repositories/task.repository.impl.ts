import {
  AddTagDto,
  CreateTaskDto,
  GetKeyTaskDto,
  RemoveTagDto,
  TaskDatasource,
  TaskEntity,
  TaskRepository,
} from "../../domain";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly taskDatasource: TaskDatasource) {}

  findAll() {
    return this.taskDatasource.findAll();
  }
  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskDatasource.create(createTaskDto);
  }
  update() {
    return this.taskDatasource.update();
  }

  addTagToTask(keyTask: GetKeyTaskDto, keyTag: AddTagDto) {
    return this.taskDatasource.addTagToTask(keyTask, keyTag);
  }

  removeTagToTask(keyTask: GetKeyTaskDto, keyTag: RemoveTagDto) {
    return this.taskDatasource.removeTagToTask(keyTask, keyTag);
  }
}
