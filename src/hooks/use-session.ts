import {
  CreateSessionRequestDto,
  CreateSessionResponseDto,
} from "@/data/session-types";
import { Session } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session>();

  async function createSession({ name }: CreateSessionRequestDto) {
    axios
      .post<CreateSessionResponseDto>("/api/session", { name })
      .then((response) => {
        localStorage.setItem("localSessionId", response.data.id + "");
        setSession(response.data);
      })
      .catch(() => {});
  }

  async function getSession() {
    const localSessionId = localStorage.getItem("localSessionId");
    axios
      .get<CreateSessionResponseDto>("/api/session", {
        params: { localSessionId },
      })
      .then((response) => {
        setSession(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getSession();
  }, []);

  return {
    session,
    createSession,
  };
}
