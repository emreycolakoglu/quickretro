import http from "http";
import { type Express } from "express";

export class HttpServerWrapper {
  public server: http.Server;

  constructor(app: Express) {
    this.server = http.createServer(app);
  }

  public start(): Promise<void> {
    const port = process.env["PORT"] || 3000;

    return new Promise((resolve, reject) => {
      this.server.listen(port, () => resolve());
      this.server.on("error", (err) => reject(err));
    });
  }
}
