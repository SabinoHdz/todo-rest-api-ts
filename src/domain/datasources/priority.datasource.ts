import { PriorityEntity } from "../entities/priorityEntity";
import { CreatePriorityDto } from "../dtos/priority/create-priority.dto";
export abstract class PriorityDataSource {
  abstract create(
    createPriorityDto: CreatePriorityDto
  ): Promise<PriorityEntity>;
  abstract findAll(): Promise<PriorityEntity[]>;
}
