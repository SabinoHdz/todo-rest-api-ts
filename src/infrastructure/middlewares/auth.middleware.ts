import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";

export class AuthMiddleware {
  static readonly validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization) {
      res.status(401).json({ error: "No token provided" });
      return;
    }
    if (!authorization.startsWith("Bearer")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const token = authorization.split(" ").at(1) || "";
    try {
      const payload = await JwtAdapter.validateTokenJwt<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: "Invalid Token" });
        return;
      }
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ error: "Invalid Token" });
        return;
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
