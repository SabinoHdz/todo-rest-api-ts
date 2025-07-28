import { Types } from "mongoose";

export class UpdateTaskDto {
  constructor(
    public title: string,
    public status: Types.ObjectId,
    public priority: Types.ObjectId,
    public description?: string,
    public tags?: string[],
    public dueDate?: Date
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
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
    let normalizeTags: string[] | undefined;
    if (tags !== undefined) {
      if (typeof tags === "string") {
        if (!tags.trim())
          return ["The 'tags' field must be a non-empty string"];

        let splitTags = tags.split(",");
        normalizeTags = this.formatterTags(splitTags);
      } else if (Array.isArray(tags)) {
        normalizeTags = this.formatterTags(tags);
      } else {
        return ["The 'tags' field must be a string or an array of strings"];
      }
      //validar que todos sean Object Ids validos

      const invalidTag = normalizeTags.find(
        (tag) => !Types.ObjectId.isValid(tag)
      );
      if (invalidTag) {
        return [`Invalid tag ID: ${invalidTag}`];
      }
    }
    return [
      undefined,
      new UpdateTaskDto(
        title,
        status,
        priority,
        description,
        normalizeTags,
        dueDate
      ),
    ];
  }

  private static formatterTags = (tags: string[]): string[] => {
    return tags.map((tag: string) => tag.trim()).filter((tag: string) => tag);
  };
}
