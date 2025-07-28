import express, { Router } from "express";
import { errorHandler, logErrors } from "../infrastructure";
import { buildLogger } from "../config";

interface OptionsServer {
  port?: number;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: OptionsServer) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }
  async start() {
    const logger = buildLogger("Server.ts");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //rutas definidas

    this.app.use(this.routes);
    this.app.use(logErrors);
    this.app.use(errorHandler);

    this.app.listen(this.port, () => {
      console.log(`Server running on port  ${this.port}\n`);
      //logger.log(`Server running onn port  ${this.port}`);
    });
  }
}
