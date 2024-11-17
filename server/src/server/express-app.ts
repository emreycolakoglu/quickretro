import express from "express";
import cors from "cors";
import { mainRouter } from "../api/mainRouter";

const _app = express();
// Middleware
_app.use(cors());
_app.use(express.json());

_app.use("/", express.static(__dirname + "/client"));

_app.use("/api", mainRouter);

export const app = _app;
