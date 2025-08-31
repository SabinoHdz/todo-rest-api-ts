import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthController } from "./auth.controller";

export class AuthRouter {
  static get routes() {
    const router = Router();
    // Define auth routes here
    const datasource = new AuthDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);
    const constroller = new AuthController(repository);
    router.post("/login", constroller.login);
    router.post("/register", constroller.register);
    return router;
  }
}
