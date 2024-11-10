/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { RetrospectiveTypes } from "@/data/retrospective-types";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(expressWrapper(cors()))
  .get(async (req, res) => {
    if (!req.query.localSessionId) {
      return res.status(404).end();
    }

    const db = new PrismaClient();

    const retros = await db.retrospective.findMany({
      where: { stage: { not: RetrospectiveTypes.ENDED } },
    });

    if (!retros || retros.length === 0) {
      return res.status(404).end();
    }

    res.json(retros);
  })
  .post(async (req, res) => {
    const db = new PrismaClient();

    const retro = await db.retrospective.create({
      data: {
        topic: req.body.topic,
        adminSessionId: req.body.adminSessionId,
      },
    });

    res.json(retro);
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
