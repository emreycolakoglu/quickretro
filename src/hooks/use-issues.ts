import {
  CreateIssueRequestDto,
  CreateIssueResponseDto,
} from "@/data/session-types";
import { Issue } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useIssue() {
  const [issues, setIssues] = useState<Issue[]>();
  const [issuesLoading, setIssuesLoading] = useState(false);

  async function createIssue(payload: CreateIssueRequestDto) {
    setIssuesLoading(true);
    axios
      .post<CreateIssueResponseDto[]>("/api/issue", payload)
      .then(() => {
        getIssues();
      })
      .catch(() => {})
      .finally(() => setIssuesLoading(false));
  }

  async function getIssues() {
    setIssuesLoading(true);
    axios
      .get<Issue[]>("/api/issue")
      .then((response) => {
        setIssues(response.data);
      })
      .catch(() => {})
      .finally(() => setIssuesLoading(false));
  }

  useEffect(() => {
    getIssues();
  }, []);

  return {
    issues,
    issuesLoading,
    createIssue,
  };
}
