import { CustomError } from "../errors/CustomError";

export class PriorityEntity {
  constructor(public id: string, public name: string, public color?: string) {}
  static mapperObject(object: { [key: string]: any }) {
    const { _id, id, name, color } = object;
    if (!id || !_id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");

    return new PriorityEntity(_id || id, name, color);
  }
}
