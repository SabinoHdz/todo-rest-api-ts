import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";
import {
  RegisterDto,
  UserEntity,
  LoginDto,
  AuthDatasource,
  CustomError,
} from "../../domain";
import { UserEntiryMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl extends AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {
    super();
  }

  async login(loginUserDto: LoginDto): Promise<UserEntity> {
    try {
      const { email, password } = loginUserDto;
      const exitsUser = await UserModel.findOne({ email: email });
      if (!exitsUser) {
        throw CustomError.badRequest(
          "Incorrect user or  password .Please try again"
        );
      }
      const isValidAccount = this.comparePassword(
        password,
        exitsUser?.password
      );
      if (!isValidAccount) {
        throw CustomError.badRequest(
          "Incorrect user or  password .Please try again"
        );
      }
      return UserEntiryMapper.userEntityFromObject(exitsUser);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer("Error logging");
    }
  }

  async register(registerUserDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password, ...rest } = registerUserDto;
    console.log("registerUserDto", registerUserDto);

    try {
      //1.Verificar si el correo existe
      const exists = await UserModel.findOne({ email: email });
      if (exists) throw CustomError.badRequest("User already exits");
      //2.Hacer un hash de contraseña

      console.log("password", password);

      const user = await UserModel.create({
        ...rest,
        name,
        email,
        password: this.hashPassword(password),
      });
      await user.save();

      //3.maper la respuesta a nuestra entidad

      return UserEntiryMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer("Error registering user");
    }
  }
}
