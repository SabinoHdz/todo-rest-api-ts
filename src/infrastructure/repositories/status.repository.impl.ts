import {
  CreateStatusDto,
  GetKeyStatusDto,
  StatusDatasource,
  StatusEntity,
  StatusRepository,
  UpdateStatusDto,
} from "../../domain";

export class StatusRepositoryImpl implements StatusRepository {
  constructor(private readonly statusDatasoruce: StatusDatasource) {}
  findAll(): Promise<StatusEntity[]> {
    return this.statusDatasoruce.findAll();
  }
  create(createStatusDto: CreateStatusDto): Promise<StatusEntity> {
    return this.statusDatasoruce.create(createStatusDto);
  }
  update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity> {
    return this.statusDatasoruce.update(getkeyStatus, updateStatusDto);
  }
}
