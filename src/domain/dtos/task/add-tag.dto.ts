import { Types } from "mongoose";

export class AddTagDto {
  private constructor(public id: string) {}

  static create(object: { [key: string]: any }): [string?, AddTagDto?] {
    const { addTagId } = object;

    if (!addTagId || typeof addTagId !== "string" || !addTagId.trim())
      return ["The key of the tag is required"];
    if (!Types.ObjectId.isValid(addTagId))
      return ["The id provided is not a valid MongoDB ObjectId"];
    return [undefined, new AddTagDto(addTagId)];
  }
}
