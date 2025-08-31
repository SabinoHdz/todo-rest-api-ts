import { CustomError, UserEntity } from "../../domain";

export class UserEntiryMapper {
  static userEntityFromObject(obj: { [key: string]: any }) {
    const { id, _id, name, lastname, username, email, password, roles } = obj;
    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");

    if (!password) throw CustomError.badRequest("Missing password");
    //if (roles.length == 0) throw CustomError.badRequest("Missing name");
    return new UserEntity(
      id || _id,
      name,
      lastname,
      username,
      email,
      password,
      roles
    );
  }
}
