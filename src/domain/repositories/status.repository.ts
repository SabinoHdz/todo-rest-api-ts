import { CreateStatusDto } from "../dtos/status/create-status.dto";
import { GetKeyStatusDto } from "../dtos/status/get-key-status.dto";
import { UpdateStatusDto } from "../dtos/status/update-status.dto";
import { StatusEntity } from "../entities/status.entity";

export abstract class StatusRepository {
  abstract findAll(): Promise<StatusEntity[]>;
  abstract create(createStatusDto: CreateStatusDto): Promise<StatusEntity>;
  abstract update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity>;
}
