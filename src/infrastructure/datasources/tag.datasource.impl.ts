import { TagModel } from "../../data";
import {
  CreateTagDto,
  CustomError,
  GetKeyTagDto,
  TagDatasource,
  TagEntity,
  UpdateTagDto,
} from "../../domain";

export class TagDatasourceImpl implements TagDatasource {
  async findAll(): Promise<TagEntity[]> {
    const tags = await TagModel.find();
    const tagsEntity = tags.map((tag) => TagEntity.mapperObject(tag));
    return tagsEntity;
  }
  async create(createTagDto: CreateTagDto): Promise<TagEntity> {
    const existTag = await TagModel.findOne({
      name: createTagDto.name,
    });

    if (existTag) throw CustomError.badRequest("Name already exist!!");

    const tag = new TagModel(createTagDto);
    const tagSaved = await tag.save();

    return TagEntity.mapperObject(tagSaved);
  }
  async update(
    getKeyTag: GetKeyTagDto,
    updateTagDto: UpdateTagDto
  ): Promise<TagEntity> {
    const { id } = getKeyTag;
    const existTag = await TagModel.findOne({
      name: updateTagDto.name,
      _id: { $ne: id }, // busca nombre igual pero diferente id
    });

    if (existTag && existTag.id !== id)
      throw CustomError.badRequest("Name already exist!!");

    const updated = await TagModel.findByIdAndUpdate(
      id,
      { ...updateTagDto },
      { new: true }
    );
    if (!updated) throw CustomError.notFound("The tag was not found");
    return TagEntity.mapperObject(updated);
  }
}
