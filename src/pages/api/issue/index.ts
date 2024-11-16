/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(expressWrapper(cors()))
  // .get(async (req, res) => {
  //   if (!req.query.localSessionId) {
  //     return res.status(404).end();
  //   }

  //   const db = new PrismaClient();

  //   const retros = await db.retrospective.findMany({
  //     where: { stage: { not: RetrospectiveStages.ENDED } },
  //   });

  //   if (!retros || retros.length === 0) {
  //     return res.status(404).end();
  //   }

  //   res.json(retros);
  // })
  .post(async (req: any, res) => {
    const db = new PrismaClient();

    const issue = await db.issue.create({
      data: {
        ...req.body,
      },
    });

    if (req.socket.server.io) {
      req.socker.server.io.emit("issue", issue);
    }

    res.json(issue);
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
