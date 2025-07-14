import { Types } from "mongoose";

export class GetKeyPriorityDto {
  private constructor(public id: string) {}

  static create(object: { [key: string]: any }): [string?, GetKeyPriorityDto?] {
    const { id } = object;

    if (!id || typeof id !== "string" || !id.trim())
      return ["The key of the priority is required"];
    if (!Types.ObjectId.isValid(id))
      return ["The id provided is not a valid MongoDB ObjectId"];
    return [undefined, new GetKeyPriorityDto(id)];
  }
}
