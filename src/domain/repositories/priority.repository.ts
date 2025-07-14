import { PriorityEntity } from "../entities/priorityEntity";
import { CreatePriorityDto } from "../dtos/priority/create-priority.dto";
import { GetKeyPriorityDto } from "../dtos/priority/get-key-priority.dto";
import { UpdatePriorityDto } from "../dtos/priority/update-priority.dto";
export abstract class PriorityRepository {
  abstract create(
    createPriorityDto: CreatePriorityDto
  ): Promise<PriorityEntity>;
  abstract findAll(): Promise<PriorityEntity[]>;

  abstract update(
    getKey: GetKeyPriorityDto,
    updatePriority: UpdatePriorityDto
  ): Promise<PriorityEntity>;
}
