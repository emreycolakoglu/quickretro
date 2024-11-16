import { Retrospective } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useRetrospectiveById(id?: number) {
  const [retrospective, setRetrospective] = useState<Retrospective>();
  const [retroLoading, setRetroloading] = useState(false);

  async function getRetrospectives() {
    setRetroloading(true);
    axios
      .get<Retrospective>(`/api/retrospective/${id}`)
      .then((response) => {
        setRetrospective(response.data);
      })
      .catch(() => {})
      .finally(() => setRetroloading(false));
  }

  useEffect(() => {
    if (!id) return;
    getRetrospectives();
  }, [id]);

  return { retrospective, retroLoading };
}
