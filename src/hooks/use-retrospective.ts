import { Retrospective } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useRetrospective(localSessionId?: number) {
  const [retrospectives, setRetrospectives] = useState<Retrospective[]>([]);
  const [retroLoading, setRetroloading] = useState(false);

  async function getRetrospectives() {
    setRetroloading(true);
    axios
      .get<Retrospective[]>("/api/retrospective", {
        params: { localSessionId },
      })
      .then((response) => {
        setRetrospectives(response.data);
      })
      .catch(() => {})
      .finally(() => setRetroloading(false));
  }

  useEffect(() => {
    if (!localSessionId) return;
    getRetrospectives();
  }, [localSessionId]);

  return { retrospectives, retroLoading };
}
