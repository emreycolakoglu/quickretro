/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(expressWrapper(cors()))
  .get(async (req, res) => {
    const db = new PrismaClient();

    const sessions = await db.session.findMany();

    res.json({ sessions });
  })
  .post(async (req, res) => {
    const db = new PrismaClient();

    const session = await db.session.create({
      data: {
        name: req.body.name,
      },
    });

    res.json(session);
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
