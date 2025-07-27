export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public status: string,
    public priority: string,
    public description?: string,
    public tags?: string[],
    public dueDate?: string
  ) {}

  static mapperObject(object: { [key: string]: any }) {
    const { _id, id, title, status, priority, description, tags, dueDate } =
      object;
    return new TaskEntity(
      id || _id,
      title,
      status,
      priority,
      description,
      tags,
      dueDate
    );
  }
}
