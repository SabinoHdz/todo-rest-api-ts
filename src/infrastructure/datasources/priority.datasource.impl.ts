import { PriorityModel } from "../../data";
import {
  CreatePriorityDto,
  CustomError,
  PriorityDataSource,
  PriorityEntity,
} from "../../domain";

export class PriorityDatasourceImpl implements PriorityDataSource {
  async create(createPriorityDto: CreatePriorityDto): Promise<PriorityEntity> {
    const existPriority = await PriorityModel.findOne({
      name: createPriorityDto.name,
    });
    if (existPriority) throw CustomError.badRequest("Name already exist!!");
    try {
      const priority = new PriorityModel(createPriorityDto);
      const priortySaved = await priority.save();
      const priorityEntity = PriorityEntity.mapperObject(priortySaved);

      return priorityEntity;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async findAll(): Promise<PriorityEntity[]> {
    const priorities = await PriorityModel.find();
    const prioritiesEntity = priorities.map((priority) =>
      PriorityEntity.mapperObject(priority)
    );
    return prioritiesEntity;
  }
}
