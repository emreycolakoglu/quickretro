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
