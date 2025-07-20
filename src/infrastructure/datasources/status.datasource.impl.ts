import { StatusModel } from "../../data";
import {
  CreateStatusDto,
  CustomError,
  GetKeyStatusDto,
  StatusDatasource,
  StatusEntity,
  UpdateStatusDto,
} from "../../domain";

export class StatusDatasoruceImpl implements StatusDatasource {
  async findAll(): Promise<StatusEntity[]> {
    const statuses = await StatusModel.find();
    return statuses.map((status) => StatusEntity.mapperObject(status));
  }
  async create(createStatusDto: CreateStatusDto): Promise<StatusEntity> {
    const existStatus = await StatusModel.findOne({
      name: createStatusDto.name,
    });
    if (existStatus) throw CustomError.badRequest("Name already exist");
    const status = new StatusModel(createStatusDto);
    const statusSaved = await status.save();
    const statusEntity = StatusEntity.mapperObject(statusSaved);
    return statusEntity;
  }
  async update(
    getkeyStatus: GetKeyStatusDto,
    updateStatusDto: UpdateStatusDto
  ): Promise<StatusEntity> {
    const { id } = getkeyStatus;
    const existStatus = await StatusModel.findOne({
      name: updateStatusDto.name,
      _id: { $ne: id },
    });
    if (existStatus && existStatus.id !== id)
      throw CustomError.badRequest("Name already exist!!");
    const updated = await StatusModel.findByIdAndUpdate(
      id,
      { ...updateStatusDto },
      { new: true }
    );
    if (!updated) throw CustomError.notFound("The status was not found");
    return StatusEntity.mapperObject(updated);
  }
}
