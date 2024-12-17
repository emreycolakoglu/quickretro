import { connectToDB } from "../../server/database";
import r from "rethinkdb";
import { Request, Response } from "express";

export async function getCurrentSessions(req: Request, res: Response) {
  const conn = await connectToDB();

  const sessions = await r
    .table("sessions")
    .orderBy(r.desc("updated_at"))
    .run(conn)
    .then((sessions) => {
      return sessions;
    });

  res.status(200).json(sessions);
}

export async function createSession(req: Request, res: Response) {
  const conn = await connectToDB();

  const session = await r
    .table("sessions")
    .insert({
      ...req.body,
      created_at: r.now(),
    })
    .run(conn);

  if (!session.replaced) {
    res.status(500).json({ message: "Failed to create session" });
  }

  res.status(201).json(session.generated_keys[0]);
}

export async function getSessionById(req: Request, res: Response) {
  const conn = await connectToDB();

  const session = await r
    .table("sessions")
    .get(req.params["id"] as string)
    .run(conn);

  if (!session) {
    res.status(404).json({ message: "Session not found" });
  }

  res.status(200).json(session);
}
