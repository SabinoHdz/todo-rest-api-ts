import { Types } from "mongoose";

export class RemoveTagDto {
  private constructor(public id: string) {}

  static create(object: { [key: string]: any }): [string?, RemoveTagDto?] {
    const { removeTagId } = object;

    if (!removeTagId || typeof removeTagId !== "string" || !removeTagId.trim())
      return ["The key of the tag is required"];
    if (!Types.ObjectId.isValid(removeTagId))
      return ["The id provided is not a valid MongoDB ObjectId"];
    return [undefined, new RemoveTagDto(removeTagId)];
  }
}
