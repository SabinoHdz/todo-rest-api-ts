import {
  CreateStatusDto,
  GetKeyStatusDto,
  PaginationDto,
  StatusEntity,
  TagDatasource,
  TagEntity,
  TagPaginatioEntity,
  TagRepository,
  UpdateStatusDto,
} from "../../domain";

export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly tagDatasource: TagDatasource) {}
  findAll(paginationDto: PaginationDto): Promise<TagPaginatioEntity> {
    return this.tagDatasource.findAll(paginationDto);
  }
  create(createStatusDto: CreateStatusDto): Promise<TagEntity> {
    return this.tagDatasource.create(createStatusDto);
  }
  update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<TagEntity> {
    return this.tagDatasource.update(getkeyStatus, updateStatusDto);
  }
}
