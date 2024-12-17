import { Router } from "express";
import {
  createSession,
  getCurrentSessions,
  getSessionById,
} from "./session.controller";

export const sessionRouter = Router();

sessionRouter.route("/").get(getCurrentSessions).post(createSession);
sessionRouter.route("/:id").get(getSessionById);
