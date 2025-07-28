import { NextFunction, Request, Response } from "express";
import { buildLogger } from "../../config";

export const logErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("########logError: #######: ");
  console.error(err);
  console.log("###########Fin############");

  next(err);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("ejecucion del errorHandler");
  const logger = buildLogger("error.hadnler.ts");
  const status: number = err.code || 500;
  const message = err.message || "Internal Server Error";
  console.error(`[ERROR] ${status} - ${message}`);
  if (status >= 500) {
    logger.error(`${req.method} ${req.originalUrl} - ${message}`);
  }
  res.status(status).json({ error: message });
};
