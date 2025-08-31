import { JwtAdapter } from "../../config";
import { RegisterDto } from "../dtos/auth/register-user.dto";
import { CustomError } from "../errors/CustomError";
import { AuthRepository } from "../repositories/auth.repository";

interface RegisterUserCase {
  execute(registerDto: RegisterDto): Promise<UserToken>;
}

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
type SignTokenFun = (
  payload: Object,
  duration?: number
) => Promise<string | null>;

export class RegisterUser implements RegisterUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFun = JwtAdapter.generateToken
  ) {}
  async execute(registerDto: RegisterDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerDto);
    const token = await this.signToken({ id: user.id }, 60 * 60);
    if (!token) {
      throw CustomError.internalServer("Error generating token");
    }
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
