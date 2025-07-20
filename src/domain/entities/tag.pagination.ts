import { CustomError } from "../errors/CustomError";
import { TagEntity } from "./tag.entity";

export class TagPaginatioEntity {
  constructor(
    public page: number,
    public limit: number,
    public total: number,
    public next: String | null,
    public prev: String | null,
    public tags: TagEntity[]
  ) {}
  static mapperObject(object: { [key: string]: any }) {
    const { page, limit, total, next, prev, tags } = object;

    return new TagPaginatioEntity(page, limit, total, next, prev, tags);
  }
}
