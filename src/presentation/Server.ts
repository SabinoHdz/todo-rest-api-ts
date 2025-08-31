import express, { Router } from "express";
import { errorHandler, logErrors } from "../infrastructure";
import { buildLogger } from "../config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

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

    //header de seguridad
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      })
    );
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        error: "too many request, please try again later",
        retryAfter: 15,
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use("/api", limiter);
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "1mb" }));

    ///Opcional
    //this.app.use(AntiNoSQLMiddleware.securityLogger);
    //anti no sql injection
    //this.app.use(AntiNoSQLMiddleware.prevent);
    //rutas definidas

    /// 4. MongoDB Sanitization (LA CLAVE)
    this.app.use(
      mongoSanitize({
        replaceWith: "_", // Reemplaza caracteres peligrosos
      })
    );

    // 5. Logging de requests sospechosos
    this.app.use((req, res, next) => {
      const originalBody = JSON.stringify(req.body);
      const originalQuery = JSON.stringify(req.query);

      // Detectar patrones sospechosos DESPUÉS de sanitización
      if (originalBody.includes("$") || originalQuery.includes("$")) {
        console.warn(`🚨 Suspicious request from ${req.ip}:`);
        console.warn(`   Method: ${req.method} ${req.url}`);
        console.warn(`   User-Agent: ${req.get("User-Agent")}`);
      }

      next();
    });

    this.app.use(this.routes);
    this.app.use(logErrors);
    this.app.use(errorHandler);

    this.app.listen(this.port, () => {
      console.log(`Server running on port  ${this.port}\n`);
      //logger.log(`Server running onn port  ${this.port}`);
    });
  }
}
