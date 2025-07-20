import { Types } from "mongoose";

export class GetKeyStatusDto {
  private constructor(public id: string) {}

  static create(object: { [key: string]: any }): [string?, GetKeyStatusDto?] {
    const { id } = object;

    if (!id || typeof id !== "string" || !id.trim())
      return ["The key of the status is required"];
    if (!Types.ObjectId.isValid(id))
      return ["The id provided is not a valid MongoDB ObjectId"];
    return [undefined, new GetKeyStatusDto(id)];
  }
}
