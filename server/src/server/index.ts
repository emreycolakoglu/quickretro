import { app } from "./express-app";
import { HttpServerWrapper } from "./http-server";
import { SocketIOWrapper } from "./socket-server";

const httpServer = new HttpServerWrapper(app);
const socketServer = new SocketIOWrapper(httpServer.server);

export { httpServer, socketServer };
