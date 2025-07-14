import { TagEntity } from "../entities/tag.entity";
import { CreateTagDto } from "../dtos/tag/create-tag.dto";
import { GetKeyTagDto } from "../dtos/tag/get-key-tag.dto";
import { UpdateTagDto } from "../dtos/tag/update-tag.dto";

export abstract class TagDatasource {
  abstract findAll(): Promise<TagEntity[]>;
  abstract create(createTagDto: CreateTagDto): Promise<TagEntity>;
  abstract update(
    getKeyTag: GetKeyTagDto,
    updateTagDto: UpdateTagDto
  ): Promise<TagEntity>;
}
