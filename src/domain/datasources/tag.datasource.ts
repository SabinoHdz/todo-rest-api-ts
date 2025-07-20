import { TagEntity } from "../entities/tag.entity";
import { CreateTagDto } from "../dtos/tag/create-tag.dto";
import { GetKeyTagDto } from "../dtos/tag/get-key-tag.dto";
import { UpdateTagDto } from "../dtos/tag/update-tag.dto";
import { PaginationDto } from "../dtos/common/pagination.dto";
import { TagPaginatioEntity } from "../entities/tag.pagination";

export abstract class TagDatasource {
  abstract findAll(paginationDto: PaginationDto): Promise<TagPaginatioEntity>;
  abstract create(createTagDto: CreateTagDto): Promise<TagEntity>;
  abstract update(
    getKeyTag: GetKeyTagDto,
    updateTagDto: UpdateTagDto
  ): Promise<TagEntity>;
}
