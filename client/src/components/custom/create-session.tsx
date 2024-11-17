import { useSessions } from "@/hooks/use-sessions";
import React, { ReactElement, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const CreateSession = (props: Props): ReactElement => {
  const { createSession } = useSessions();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createSession({
      name,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Welcome to RetroMeet
        </CardTitle>
        <CardDescription className="text-center">
          Join your team's retrospective meeting with just your name
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Join Retrospective
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface Props {}
