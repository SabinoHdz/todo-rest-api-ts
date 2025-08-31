import { JwtAdapter } from "../../config";
import { AuthRepository, CustomError, LoginDto, RegisterDto } from "..";

interface LoginUserCase {
  execute(registerUserDto: RegisterDto): Promise<UserToken>;
}

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
type SignTokenFn = (
  payload: Object,
  duration?: number
) => Promise<string | null>;

export class LoginUser implements LoginUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFn = JwtAdapter.generateToken
  ) {}
  async execute(loginUserDto: LoginDto): Promise<UserToken> {
    //crear usuario
    const user = await this.authRepository.login(loginUserDto);
    //token
    const token = await this.signToken({ id: user.id }, 60 * 60);
    if (!token) {
      throw CustomError.internalServer("Error generating token");
    }
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
