import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";

export class SocketIOWrapper {
  private io: SocketIOServer;

  constructor(server: HttpServer) {
    this.io = new SocketIOServer(server);
  }

  public emitEvent(event: string, data?: any): void {
    this.io.emit(event, data);
  }
}
