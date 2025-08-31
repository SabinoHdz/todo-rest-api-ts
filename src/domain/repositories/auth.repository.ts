import { LoginDto } from "../dtos/auth/login-user.dto";
import { RegisterDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract register(registerDto: RegisterDto): Promise<UserEntity>;
  abstract login(loginDto: LoginDto): Promise<UserEntity>;
}
