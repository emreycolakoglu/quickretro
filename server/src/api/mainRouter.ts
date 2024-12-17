import express from "express";
import { socketServer } from "../server";
import { sessionRouter } from "./session/session.router";

export const mainRouter = express.Router();

mainRouter.use("/api", (req, res) => {
  socketServer.emitEvent("test event", { hello: "world" });
  res.send("Hello, world!");
});

mainRouter.use("/sessions", sessionRouter);
