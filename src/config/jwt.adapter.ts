import jwt from "jsonwebtoken";
import { envs } from "./envs.adapter";

const JWT_SEED = envs.JWT_SEED;
export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: number = 60 * 60
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static async validateTokenJwt<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SEED, (err, decode) => {
        if (err) return resolve(null);
        resolve(decode as T);
      });
    });
  }
}
