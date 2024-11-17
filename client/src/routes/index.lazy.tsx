import { CreateSession } from "@/components/custom/create-session";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessions } from "@/hooks/use-sessions";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { sessions, sessionsLoading, sessionsError } = useSessions();

  if (sessionsLoading) {
    return <Skeleton />;
  }

  if (!sessions || sessions.length === 0 || sessionsError)
    return <CreateSession />;
}
