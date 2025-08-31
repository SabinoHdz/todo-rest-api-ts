import { NextFunction, Request, Response } from "express";
import {
  AuthRepository,
  LoginDto,
  LoginUser,
  RegisterDto,
  RegisterUser,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  login = (req: Request, res: Response, next: NextFunction) => {
    const [error, loginUserDto] = LoginDto.create(req.body);
    if (error) return res.status(400).json({ message: error });
    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };
  register = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterDto.create(req.body);
    if (error) return res.status(400).json({ message: error });
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };
}
