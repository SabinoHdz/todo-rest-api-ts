import { CreateStatusDto } from "../dtos/status/create-status.dto";
import { StatusEntity } from "../entities/status.entity";
import { GetKeyStatusDto } from "../dtos/status/get-key-status.dto";
import { UpdateStatusDto } from "../dtos/status/update-status.dto";
import { StatusController } from "../../presentation/status/status.controller";
export abstract class StatusDatasource {
  abstract findAll(): Promise<StatusEntity[]>;
  abstract create(
    StatusControllerreateStatusDto: CreateStatusDto
  ): Promise<StatusEntity>;
  abstract update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity>;
}
