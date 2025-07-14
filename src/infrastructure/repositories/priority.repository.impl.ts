import {
  CreatePriorityDto,
  PriorityDataSource,
  PriorityEntity,
  PriorityRepository,
} from "../../domain";

export class PriorityRepositoryImpl implements PriorityRepository {
  constructor(private readonly priorityDatasource: PriorityDataSource) {}

  create(createPriorityDto: CreatePriorityDto): Promise<PriorityEntity> {
    return this.priorityDatasource.create(createPriorityDto);
  }
  findAll(): Promise<PriorityEntity[]> {
    return this.priorityDatasource.findAll();
  }
}
