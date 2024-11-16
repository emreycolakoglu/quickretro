import { Issue, Session } from "@prisma/client";

export type CreateSessionRequestDto = {
  name: string;
};

export type CreateSessionResponseDto = Session;

export type CreateIssueRequestDto = {};

export type CreateIssueResponseDto = Issue;
