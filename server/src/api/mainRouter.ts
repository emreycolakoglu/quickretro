import express from "express";
import { socketServer } from "../server";

export const mainRouter = express.Router();

mainRouter.use("/api", (req, res) => {
  socketServer.emitEvent("test event", { hello: "world" });
  res.send("Hello, world!");
});
