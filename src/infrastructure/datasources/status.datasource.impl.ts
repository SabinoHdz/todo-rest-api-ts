import {
  CreateStatusDto,
  GetKeyStatusDto,
  StatusDatasource,
  StatusEntity,
  UpdateStatusDto,
} from "../../domain";

export class StatusDatasoruceImpl implements StatusDatasource {
  findAll(): Promise<StatusEntity[]> {
    throw new Error("Method not implemented.");
  }
  create(reateStatusDto: CreateStatusDto): Promise<StatusEntity> {
    throw new Error("Method not implemented.");
  }
  update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity> {
    throw new Error("Method not implemented.");
  }
}
