import { Session } from "@prisma/client";

export type CreateSessionRequestDto = {
  name: string;
};

export type CreateSessionResponseDto = Session;
