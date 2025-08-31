import { CustomError } from "../errors/CustomError";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public username: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
    public isActive?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public lastLogin?: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidated, password, role, img } =
      object;

    if (!_id && !id) {
      throw CustomError.badRequest("Missing Id");
    }
    if (!name) throw CustomError.badRequest("Missing  name");
    if (!email) throw CustomError.badRequest("Missing  email");
    if (emailValidated == undefined)
      throw CustomError.badRequest("Missing  emailValidated");
    if (!password) throw CustomError.badRequest("Missing  password");
    if (!role) throw CustomError.badRequest("Missing role ");
    return new UserEntity(
      _id || id,
      name,
      email,
      emailValidated,
      password,
      role,
      img
    );
  }
}
