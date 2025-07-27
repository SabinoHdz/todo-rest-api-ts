import { Types } from "mongoose";

export class GetKeyTaskDto {
  private constructor(public id: string) {}

  static create(object: { [key: string]: any }): [string?, GetKeyTaskDto?] {
    const { id } = object;

    if (!id || typeof id !== "string" || !id.trim())
      return ["The key of the task is required"];
    if (!Types.ObjectId.isValid(id))
      return ["The id provided is not a valid MongoDB ObjectId"];
    return [undefined, new GetKeyTaskDto(id)];
  }
}
