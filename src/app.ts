import { envs } from "./config";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/Server";

(async () => {
  main();
})();

async function main() {
  const server = new Server({ port: envs.PORT, routes: AppRouter.routes });
  server.start();
}
