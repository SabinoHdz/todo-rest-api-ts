// src/infrastructure/middlewares/anti-nosql.middleware.ts - VERSIÓN CORREGIDA
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain";

export class AntiNoSQLMiddleware {
  // Lista de operadores MongoDB peligrosos (más precisa)
  private static readonly MONGODB_OPERATORS = [
    "$where",
    "$ne",
    "$gt",
    "$gte",
    "$lt",
    "$lte",
    "$in",
    "$nin",
    "$exists",
    "$regex",
    "$expr",
    "$jsonSchema",
    "$mod",
    "$all",
    "$elemMatch",
    "$size",
    "$type",
    "$set",
    "$unset",
    "$push",
    "$pull",
    "$addToSet",
    "$pop",
    "$rename",
    "$bit",
    "$isolated",
    "$atomic",
    "$function",
    "$accumulator",
    "$addFields",
    "$bucket",
  ];

  // Middleware principal anti-NoSQL injection
  static prevent = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Sanitizar todas las entradas
      req.query = AntiNoSQLMiddleware.deepSanitize(req.query, "query");
      req.body = AntiNoSQLMiddleware.deepSanitize(req.body, "body");
      req.params = AntiNoSQLMiddleware.deepSanitize(req.params, "params");

      next();
    } catch (error) {
      const err = error as Error;
      console.warn(`🚨 NoSQL Injection blocked: ${err.message}`);
      next(CustomError.badRequest("Invalid input detected"));
    }
  };

  // Función principal de sanitización (más inteligente)
  private static deepSanitize(payload: any, context: string = ""): any {
    if (payload === null || payload === undefined) {
      return payload;
    }

    // Si es string, verificar solo patrones realmente peligrosos
    if (typeof payload === "string") {
      if (AntiNoSQLMiddleware.containsReallyDangerousPatterns(payload)) {
        throw new Error(
          `Dangerous pattern in ${context}: ${payload.substring(0, 30)}...`
        );
      }
      return payload;
    }

    // Si es array, sanitizar cada elemento
    if (Array.isArray(payload)) {
      return payload.map((item, index) =>
        AntiNoSQLMiddleware.deepSanitize(item, `${context}[${index}]`)
      );
    }

    // Si es objeto, procesar cada propiedad
    if (typeof payload === "object") {
      const sanitized: { [key: string]: any } = {};

      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          // ❌ BLOQUEAR: Solo keys que SON operadores MongoDB
          if (AntiNoSQLMiddleware.isMongoDBOperator(key)) {
            console.warn(`🚨 Blocked MongoDB operator: ${key}`);
            throw new Error(`MongoDB operator not allowed: ${key}`);
          }

          // ❌ BLOQUEAR: Solo patrones realmente peligrosos en keys
          if (AntiNoSQLMiddleware.isReallyDangerousKey(key)) {
            console.warn(`🚨 Blocked dangerous key: ${key}`);
            throw new Error(`Dangerous key pattern: ${key}`);
          }

          // ✅ PERMITIR: Key segura, sanitizar su valor
          sanitized[key] = AntiNoSQLMiddleware.deepSanitize(
            payload[key],
            `${context}.${key}`
          );
        }
      }

      return sanitized;
    }

    // Otros tipos (number, boolean, etc.) son seguros
    return payload;
  }

  // Verificar si una key es exactamente un operador MongoDB
  private static isMongoDBOperator(key: string): boolean {
    return (
      AntiNoSQLMiddleware.MONGODB_OPERATORS.includes(key) ||
      (key.startsWith("$") && key.length > 1)
    );
  }

  // Verificar solo patrones REALMENTE peligrosos en keys (no falsos positivos)
  private static isReallyDangerousKey(key: string): boolean {
    const reallyDangerousPatterns = [
      /^__proto__$/, // Prototype pollution exacto
      /^constructor$/, // Constructor manipulation exacto
      /^prototype$/, // Prototype manipulation exacto
      // Removimos /script/ porque causaba falsos positivos con "description"
    ];

    return reallyDangerousPatterns.some((pattern) => pattern.test(key));
  }

  // Verificar patrones peligrosos en valores string (más específicos)
  private static containsReallyDangerousPatterns(str: string): boolean {
    const reallyDangerousPatterns = [
      // MongoDB operators en strings (más específicos)
      /\$ne\s*:/gi,
      /\$gt\s*:/gi,
      /\$gte\s*:/gi,
      /\$lt\s*:/gi,
      /\$lte\s*:/gi,
      /\$in\s*:/gi,
      /\$nin\s*:/gi,
      /\$exists\s*:/gi,
      /\$regex\s*:/gi,
      /\$where\s*:/gi,
      /\$expr\s*:/gi,

      // JavaScript injection (más específicos)
      /javascript\s*:/gi,
      /\beval\s*\(/gi,
      /\bfunction\s*\(/gi,

      // Script injection (más específicos - no solo "script")
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /\bon\w+\s*=/gi, // onclick, onload, etc.

      // Command injection (más específicos)
      /;\s*(rm|del|format|shutdown|curl|wget)\s/gi,
    ];

    return reallyDangerousPatterns.some((pattern) => pattern.test(str));
  }

  // Middleware específico para validar ObjectIds (sin cambios)
  static validateObjectId = (paramName: string = "id") => {
    return (req: Request, res: Response, next: NextFunction) => {
      const value = req.query[paramName] || req.params[paramName];

      if (!value) {
        return next(); // Si no hay valor, continuar
      }

      if (typeof value !== "string") {
        console.warn(
          `🚨 Invalid ObjectId type for ${paramName}: ${typeof value}`
        );
        return next(CustomError.badRequest(`${paramName} must be a string`));
      }

      if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        console.warn(`🚨 Invalid ObjectId format for ${paramName}: ${value}`);
        return next(
          CustomError.badRequest(
            `${paramName} must be a valid 24-character ObjectId`
          )
        );
      }

      next();
    };
  };

  // Middleware de logging más inteligente
  static securityLogger = (req: Request, res: Response, next: NextFunction) => {
    const suspiciousIndicators = [
      // User Agent realmente sospechoso
      req.get("User-Agent")?.toLowerCase().includes("sqlmap"),
      req.get("User-Agent")?.toLowerCase().includes("nikto"),
      req.get("User-Agent")?.toLowerCase().includes("burp"),

      // URLs realmente sospechosas
      req.url.includes("../"),
      req.url.includes("%2e%2e"),
      req.url.includes("$ne"),
      req.url.includes("$exists"),
      req.url.includes("$where"),

      // Solo loguear si realmente hay operadores MongoDB
      /\$\w+/.test(JSON.stringify(req.body)),
      /\$\w+/.test(JSON.stringify(req.query)),
    ];

    const riskLevel = suspiciousIndicators.filter(Boolean).length;

    if (riskLevel >= 2) {
      // Subimos el umbral para evitar falsos positivos
      console.warn(`🚨 SECURITY ALERT - Risk Level: ${riskLevel}/10`);
      console.warn(`   IP: ${req.ip}`);
      console.warn(`   Method: ${req.method} ${req.url}`);

      // Solo bloquear si hay alto riesgo REAL
      if (riskLevel >= 4) {
        console.error(`🚨 HIGH RISK - Blocking request`);
        return next(CustomError.badRequest("Security violation detected"));
      }
    }

    next();
  };
}

export default AntiNoSQLMiddleware;
