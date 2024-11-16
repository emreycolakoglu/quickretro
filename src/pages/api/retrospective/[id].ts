/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(expressWrapper(cors())).get(async (req, res) => {
  const db = new PrismaClient();

  console.log(req.query.id);

  const retro = await db.retrospective.findFirst({
    where: { id: parseInt(req.query.id as any) },
  });

  if (!retro) {
    return res.status(404).end();
  }

  res.json(retro);
});
// .post(async (req, res) => {
//   const db = new PrismaClient();

//   const retro = await db.retrospective.create({
//     data: {
//       topic: req.body.topic,
//       adminSessionId: req.body.adminSessionId,
//       stage: RetrospectiveStages.NOT_STARTED,
//     },
//   });

//   res.json(retro);
// });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
