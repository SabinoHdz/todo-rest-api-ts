import mongoose from "mongoose";

interface OptionsConection {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async conect(options: OptionsConection) {
    const { mongoURL, dbName } = options;
    try {
      await mongoose.connect(mongoURL, {
        dbName: dbName,
      });
      console.log("Conecct");
      return true;
    } catch (error) {
      console.log(`Error conection db: ${error}`);
      throw error;
    }
  }
}
