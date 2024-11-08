import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusCircle,
  MoreHorizontal,
  ThumbsUp,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

type Stage = "new-issue" | "voting" | "grouping" | "action";
type Column = "went-well" | "to-improve" | "action-items";

interface IssueCard {
  id: string;
  content: string;
  column: Column;
  votes: number;
}

export default function RetroView() {
  const [stage, setStage] = useState<Stage>("new-issue");
  const [showNames, setShowNames] = useState(true);
  const [issues, setIssues] = useState<IssueCard[]>([]);

  const addIssue = (column: Column) => {
    const newIssue: IssueCard = {
      id: Date.now().toString(),
      content: "",
      column,
      votes: 0,
    };
    setIssues([...issues, newIssue]);
  };

  const updateIssue = (id: string, content: string) => {
    setIssues(
      issues.map((issue) => (issue.id === id ? { ...issue, content } : issue))
    );
  };

  const voteIssue = (id: string) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, votes: issue.votes + 1 } : issue
      )
    );
  };

  const columns: { title: string; key: Column; icon: React.ReactNode }[] = [
    {
      title: "What went well",
      key: "went-well",
      icon: <ThumbsUp className="h-4 w-4" />,
    },
    {
      title: "What could be improved",
      key: "to-improve",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      title: "Action items",
      key: "action-items",
      icon: <Lightbulb className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team Retrospective</h1>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Stage: {stage.replace("-", " ")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Stage</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStage("new-issue")}>
                  New Issue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStage("voting")}>
                  Voting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStage("grouping")}>
                  Grouping
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStage("action")}>
                  Action
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={() => setShowNames(!showNames)}>
              {showNames ? "Hide Names" : "Show Names"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Card key={column.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {column.icon}
                <span className="ml-2">{column.title}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addIssue(column.key)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {issues
                .filter((issue) => issue.column === column.key)
                .map((issue) => (
                  <Card key={issue.id} className="mb-2">
                    <CardContent className="p-2">
                      <Input
                        value={issue.content}
                        onChange={(e) => updateIssue(issue.id, e.target.value)}
                        placeholder="Enter your thoughts..."
                        className="mb-2"
                      />
                      {stage === "voting" && (
                        <div className="flex justify-between items-center">
                          <span>{issue.votes} votes</span>
                          <Button size="sm" onClick={() => voteIssue(issue.id)}>
                            Vote
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
