import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSessions() {
  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetchSessions(),
  });

  const { mutateAsync: createSessionAsync, isPending: createSessionPending } =
    useMutation({
      mutationKey: ["create session"],
      mutationFn: (payload) => createSession(payload),
    });

  return {
    sessions: data,
    sessionsError: error,
    sessionsLoading: isLoading,
    sessionsRefreshing: isRefetching,
    createSession: createSessionAsync,
    isCreateSessionPending: createSessionPending,
  };
}

function fetchSessions(): Promise<any[]> {
  return axios
    .get("/api/sessions")
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching sessions:", error));
}

function createSession(payload) {
  return axios.post("/api/sessions", payload).then((response) => response.data);
}
