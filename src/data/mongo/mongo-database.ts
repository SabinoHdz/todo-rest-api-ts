import mongoose from "mongoose";
import { buildLogger } from "../../config";

interface OptionsConection {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async conect(options: OptionsConection) {
    const { mongoURL, dbName } = options;
    const logger = buildLogger("mongo-database.ts");
    try {
      logger.log("Conectando a MongoDB...");

      await mongoose.connect(mongoURL, {
        dbName: dbName,
      });
      //console.log("Conecct");
      logger.log("Conexión a MongoDB establecida");

      return true;
    } catch (error) {
      //console.log(`Error conection db: ${error}`);
      logger.error(`Error conection db: ${error}`);
      throw error;
    }
  }
}
