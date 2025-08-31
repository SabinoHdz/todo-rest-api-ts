import { ValidatorAdapter } from "../../../config";

export class RegisterDto {
  private constructor(
    public name: string,
    public lastname: string,
    public username: string,
    public email: string,
    public password: string,
    public image?: string,
    public roles?: string[],
    public isActive?: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterDto?] {
    const {
      name,
      lastname,
      username,
      email,
      password,
      image,
      roles,
      isActive,
    } = object;
    if (!name) return ["missing name"];
    if (!lastname) return ["missing lastname"];
    if (!username) return ["missing username"];
    if (!email) return ["missing email"];
    if (!ValidatorAdapter.email.test(email)) return ["Email is not valid"];
    if (!password) return ["missing password"];
    if (password.length < 6) return ["password too short"];
    return [
      undefined,
      new RegisterDto(
        name,
        lastname,
        username,
        email,
        password,
        image,
        roles,
        isActive
      ),
    ];
  }
}
