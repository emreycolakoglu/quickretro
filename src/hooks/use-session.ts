import {
  CreateSessionRequestDto,
  CreateSessionResponseDto,
} from "@/data/session-types";
import { Session } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session>();
  const [sessionLoading, setSessionloading] = useState(false);

  async function createSession({ name }: CreateSessionRequestDto) {
    setSessionloading(true);
    axios
      .post<CreateSessionResponseDto>("/api/session", { name })
      .then((response) => {
        localStorage.setItem("localSessionId", response.data.id + "");
        setSession(response.data);
      })
      .catch(() => {})
      .finally(() => setSessionloading(false));
  }

  async function getSession() {
    setSessionloading(true);
    const localSessionId = localStorage.getItem("localSessionId");
    axios
      .get<CreateSessionResponseDto>("/api/session", {
        params: { localSessionId },
      })
      .then((response) => {
        setSession(response.data);
      })
      .catch(() => {})
      .finally(() => setSessionloading(false));
  }

  useEffect(() => {
    getSession();
  }, []);

  return {
    session,
    sessionLoading,
    createSession,
  };
}
