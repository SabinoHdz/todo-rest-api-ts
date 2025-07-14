import {
  CreateStatusDto,
  GetKeyStatusDto,
  StatusEntity,
  TagDatasource,
  TagRepository,
  UpdateStatusDto,
} from "../../domain";

export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly tagDatasource: TagDatasource) {}
  findAll(): Promise<StatusEntity[]> {
    return this.tagDatasource.findAll();
  }
  create(createStatusDto: CreateStatusDto): Promise<StatusEntity> {
    return this.tagDatasource.create(createStatusDto);
  }
  update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity> {
    return this.tagDatasource.update(getkeyStatus, updateStatusDto);
  }
}
