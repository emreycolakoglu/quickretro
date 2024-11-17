import express from "express";

export const apiRouter = express.Router();

apiRouter.use("/api", (req, res) => {
  res.send("Hello, world!");
});
