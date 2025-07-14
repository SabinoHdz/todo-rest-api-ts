import {
  CreateTagDto,
  GetKeyTagDto,
  TagDatasource,
  TagEntity,
  UpdateTagDto,
} from "../../domain";

export class TagDatasourceImpl implements TagDatasource {
  findAll(): Promise<TagEntity[]> {
    throw new Error("Method not implemented.");
  }
  create(createTagDto: CreateTagDto): Promise<TagEntity> {
    throw new Error("Method not implemented.");
  }
  update(
    getKeyTag: GetKeyTagDto,
    updateTagDto: UpdateTagDto
  ): Promise<TagEntity> {
    throw new Error("Method not implemented.");
  }
}
