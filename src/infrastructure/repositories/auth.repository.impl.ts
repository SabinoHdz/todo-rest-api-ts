import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import {
  RegisterDto,
  UserEntity,
  LoginDto,
  AuthRepository,
} from "../../domain";
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super();
  }

  register(registerDto: RegisterDto): Promise<UserEntity> {
    return this.authDatasource.register(registerDto);
  }
  login(loginDto: LoginDto): Promise<UserEntity> {
    return this.authDatasource.login(loginDto);
  }
}
