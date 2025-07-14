import { PriorityModel } from "../../data";
import {
  CreatePriorityDto,
  CustomError,
  GetKeyPriorityDto,
  PriorityDataSource,
  PriorityEntity,
  UpdatePriorityDto,
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
  async update(
    getKey: GetKeyPriorityDto,
    updatePriority: UpdatePriorityDto
  ): Promise<PriorityEntity> {
    const existPriority = await PriorityModel.findOne({
      name: updatePriority.name,
      _id: { $ne: getKey.id }, // busca nombre igual pero diferente id
    });
    console.log({ existPriority });

    if (existPriority && existPriority.id !== getKey.id)
      throw CustomError.badRequest("Name already exist!!");

    const updated = await PriorityModel.findByIdAndUpdate(
      getKey.id,
      { ...updatePriority },
      { new: true }
    );
    if (!updated) throw CustomError.notFound("The priority was not found");
    return PriorityEntity.mapperObject(updated);
  }
}
