import {
  CreatePriorityDto,
  GetKeyPriorityDto,
  PriorityDataSource,
  PriorityEntity,
  PriorityRepository,
  UpdatePriorityDto,
} from "../../domain";

export class PriorityRepositoryImpl implements PriorityRepository {
  constructor(private readonly priorityDatasource: PriorityDataSource) {}

  create(createPriorityDto: CreatePriorityDto): Promise<PriorityEntity> {
    return this.priorityDatasource.create(createPriorityDto);
  }
  findAll(): Promise<PriorityEntity[]> {
    return this.priorityDatasource.findAll();
  }
  update(
    getKey: GetKeyPriorityDto,
    updatePriority: UpdatePriorityDto
  ): Promise<PriorityEntity> {
    return this.priorityDatasource.update(getKey, updatePriority);
  }
}
