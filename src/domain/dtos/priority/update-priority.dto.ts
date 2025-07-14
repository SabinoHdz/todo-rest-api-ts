import { regularExps } from "../../../config";

export class UpdatePriorityDto {
  private constructor(public name?: string, public color?: string) {}
  private static minNameLength: number = 2;

  static create(object: { [key: string]: any }): [string?, UpdatePriorityDto?] {
    const { name, color } = object;

    //validar:al menos un campo debe venir

    if (name === undefined && color === undefined)
      return ["At least one property (name or color) must be provided"];

    // ✅ Validación de name (si viene)
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim())
        return ["Name must be a non-empty string"];
      if (name.length < this.minNameLength)
        return [
          `Name is too short. Must be at least ${
            this.minNameLength + 1
          } characters`,
        ];

      // ✅ Validación de color (si viene)
      if (color !== undefined) {
        if (typeof color !== "string" || !color.trim())
          return ["Color must be a non-empty string"];
        if (!regularExps.hexColorRegex.test(color))
          return ["Color must be a valid hex code (e.g., #FF0000)"];
      }
    }

    return [undefined, new UpdatePriorityDto(name, color)];
  }
}
