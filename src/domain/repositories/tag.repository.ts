import { PaginationDto } from "../dtos/common/pagination.dto";
import { CreateStatusDto } from "../dtos/status/create-status.dto";
import { GetKeyStatusDto } from "../dtos/status/get-key-status.dto";
import { UpdateStatusDto } from "../dtos/status/update-status.dto";
import { StatusEntity } from "../entities/status.entity";
import { TagEntity } from "../entities/tag.entity";
import { TagPaginatioEntity } from "../entities/tag.pagination";

export abstract class TagRepository {
  abstract findAll(paginationDto: PaginationDto): Promise<TagPaginatioEntity>;
  abstract create(reateStatusDto: CreateStatusDto): Promise<TagEntity>;
  abstract update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<TagEntity>;
}
