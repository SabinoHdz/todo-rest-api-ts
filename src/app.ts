import { envs } from "./config";
import { MongoDatabase } from "./data/mongo/mongo-database";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/Server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.conect({
    dbName: envs.MONGO_DB_NAME,
    mongoURL: envs.MONGO_URL,
  });

  const server = new Server({ port: envs.PORT, routes: AppRouter.routes });
  server.start();
}
