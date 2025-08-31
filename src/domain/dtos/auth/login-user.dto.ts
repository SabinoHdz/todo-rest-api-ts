import { ValidatorAdapter } from "../../../config";

export class LoginDto {
  private constructor(public email: string, public password: string) {}
  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object;

    if (!email) return ["missing email"];
    if (!ValidatorAdapter.email.test(email)) return ["Email is not valid"];
    if (!password) return ["missing password"];

    return [undefined, new LoginDto(email, password)];
  }
}
