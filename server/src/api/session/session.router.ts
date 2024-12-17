import { Router } from "express";
import { getCurrentSessions } from "./session.controller";

export const sessionRouter = Router();

sessionRouter.route("/").get(getCurrentSessions);
