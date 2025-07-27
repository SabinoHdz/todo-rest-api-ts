import { Types } from "mongoose";

export class CreateTaskDto {
  private constructor(
    public title: string,
    public status: Types.ObjectId,
    public priority: Types.ObjectId,
    public description?: string,
    public tags?: Types.ObjectId[],
    public dueDate?: Date
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { title, status, priority, description, tags, dueDate } = object;

    if (!title || typeof title !== "string" || !title.trim())
      return ["Title is required and must be a non-empty"];

    if (description !== undefined) {
      if (typeof description !== "string")
        return ["Description must be a string if provided"];
      if (!description.trim()) return ["Description must be a non-empty"];
    }

    if (!status || !Types.ObjectId.isValid(status))
      return ["Status is required and must be a valid Id"];

    if (!priority || !Types.ObjectId.isValid(priority)) {
      return ["priority is required and must be a valid Id"];
    }
    if (tags != undefined) {
      if (!Array.isArray(tags)) return ["Tags must be an array of tags' Id"];

      for (const tag of tags) {
        console.log({ tag });
        if (!Types.ObjectId.isValid(tag)) {
          return ["Each tag must be a valid Id"];
        }
      }
      if (dueDate !== undefined) {
        const date = new Date(dueDate);
        console.log({ date });

        if (isNaN(date.getTime())) return ["Due date must be a valid date"];
      }
    }

    return [
      undefined,
      new CreateTaskDto(
        title,
        new Types.ObjectId(status),
        new Types.ObjectId(priority),
        description,
        tags,
        dueDate
      ),
    ];
  }
}
