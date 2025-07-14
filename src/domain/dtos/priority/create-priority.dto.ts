import { regularExps } from "../../../config";

export class CreatePriorityDto {
  private constructor(public name: string, public color?: string) {}
  private static lengName: number = 2;
  static create(object: { [key: string]: any }): [string?, CreatePriorityDto?] {
    const { name, color } = object;
    if (!name || typeof name !== "string" || !name.trim())
      return ["Name property is required"];

    if (name.length <= this.lengName)
      return ["The name is too short. It must be at least 3 characters"];

    if (color !== undefined) {
      if (typeof color !== "string") return ["Color must be a string "];

      if (!color.trim()) return ["Color cannot be empty or whitespace only"];
      if (color && !regularExps.hexColorRegex.test(color))
        return ["Color must be a valid hex code (e.g., #FF0000)"];
    }

    return [undefined, new CreatePriorityDto(name, color)];
  }
}
