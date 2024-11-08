/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/custom/logo";
import io from "socket.io-client";

const socket = io();

export default function Component() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/socket");
  }, []);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <nav>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Welcome to QuickRetro
            </CardTitle>
            <CardDescription className="text-center">
              Join your team&apos;s retrospective meeting with just your name
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
      </main>

      <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 QuickRetro. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          {" • "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
