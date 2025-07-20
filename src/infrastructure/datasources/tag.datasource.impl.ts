import { TagModel } from "../../data";
import {
  CreateTagDto,
  CustomError,
  GetKeyTagDto,
  PaginationDto,
  TagDatasource,
  TagEntity,
  TagPaginatioEntity,
  UpdateTagDto,
} from "../../domain";

export class TagDatasourceImpl implements TagDatasource {
  async findAll(paginationDto: PaginationDto): Promise<TagPaginatioEntity> {
    const { page, limit } = paginationDto;
    try {
      const [total, tags] = await Promise.all([
        TagModel.countDocuments(),
        TagModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      //const tags = await TagModel.find();

      return {
        page,
        limit,
        total,
        next:
          page * limit < total
            ? `/api/tags?page=${page + 1}&limit=${limit}`
            : null,
        prev: page - 1 > 0 ? `/api/tags?page=${page - 1}&limit=${limit}` : null,
        tags: tags.map((tag) => TagEntity.mapperObject(tag)),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
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
