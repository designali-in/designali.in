"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsUp, ChevronUp, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  projectName: string;
  projectInfo?: string | null;
  techStack: string[];
  projectUrl?: string | null;
  githubUrl?: string | null;
  completedTickets?: number | null;
  tickets: Ticket[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
}

interface Ticket {
  id: string;
  title?: string | null;
  messages?: Message | null;
  status?: string | null;
  project: Project;
  category: string[];
  priority: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  ticketId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminTicketDetails = () => {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const projectName = searchParams.get("projectName");
  const router = useRouter();
  const { toast } = useToast();
  if (!ticketId || !projectName) {
    router.push("/admin/tickets");
  }
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State to hold the selected status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/ticket?ticketId=${ticketId}`);
        const data = await response.json();
        // Process the data here
        setTicket(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching ticket:", error);
      }
    };

    fetchData();
  }, [ticketId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/messages?ticketId=${ticketId}`);
        const data = await response.json();
        // Process the data here
        setMessages(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching ticket:", error);
      }
    };

    fetchData();
  }, [ticket]);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const timePassedFromNow = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();

    const timeDifference = now.getTime() - date.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year(s) ago`;
    } else if (months > 0) {
      return `${months} month(s) ago`;
    } else if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoadingSubmit(true);
      const formData = new FormData(event.currentTarget);
      const content = formData.get("content") as string;

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
          content,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setMessageContent("");

      const fetchData = async () => {
        try {
          const response = await fetch(`/api/messages?ticketId=${ticketId}`);
          const data = await response.json();
          // Process the data here
          setMessages(data);
        } catch (error) {
          // Handle error
          console.error("Error fetching ticket:", error);
        }
      };
      fetchData();
      toast({
        title: "Your message has been sent!",
        description: <div>We will be contact with you ASAP </div>,
      });
      setLoadingSubmit(false);
      event.currentTarget.reset();
    } catch (error) {
      // Handle error
      console.error("Error sending message:", error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      console.log("selectedStatus", selectedStatus);
      console.log("ticketId", ticketId);

      const response = await fetch("/api/admin/tickets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
          status: selectedStatus,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      toast({
        title: "Ticket status updated!",
        description: <div>The ticket status has been updated successfully</div>,
      });
    } catch (error) {
      // Handle error
      console.error("Error updating ticket status:", error);
    }
  };

  const formattedDate = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="p-6">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {ticket ? <p>Ticket ID: #{ticket.id}</p> : <Skeleton />}
            </p>
            <h2 className="text-2xl font-bold">
              {ticket ? <p>{ticket.title}</p> : <Skeleton />}
            </h2>
            <p className="text-2xl font-bold text-gray-500 dark:text-gray-400">
              {projectName ? <p>{projectName}</p> : <Skeleton />}
            </p>
          </div>
          <div
            className={`scrollbar-hide scrollbar-thin h-[20rem] max-h-[20rem] space-y-2 overflow-auto rounded-2xl border p-3 md:h-[35rem] md:max-h-[35rem]`}
          >
            {Array.isArray(messages) ? (
              messages.map((message: Message, index: number) => (
                <div
                  key={index}
                  className={`flex w-full space-y-2 rounded-lg p-4 text-left  focus:outline-none ${message.sender === "ADMIN" ? " bg-green-200  dark:bg-green-800" : "justify-end bg-secondary"}`}
                >
                  <div
                    className={`grid gap-2 ${message.sender === "ADMIN" ? "" : "text-right"}`}
                  >
                    <div
                      className={`flex gap-1 ${message.sender === "ADMIN" ? "" : "justify-end text-right"}`}
                    >
                      <div className="space-y-1">
                        <p className="text-sm leading-none">
                          {message.sender !== "ADMIN" ? "" : "Designali"}
                        </p>
                      </div>
                      <time className="text-xs text-primary/30">
                        {messages[index]?.createdAt &&
                          timePassedFromNow(messages[index]?.createdAt)}
                      </time>
                    </div>
                    <p className="max-w-[50rem] overflow-hidden font-medium">
                      <span className="">{message.content}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <Skeleton />
            )}

            {loadingSubmit && <Skeleton />}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="mt-4">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <Textarea
                className="max-h-[150px] flex-1"
                placeholder="Enter your messages..."
                name="content"
                value={messageContent}
                onChange={(event) => setMessageContent(event.target.value)}
              />
              <Button type="submit" disabled={loadingSubmit}>
                Send
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Ticket Info</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your tickets informations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                  Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {ticket ? (
                    <p>
                      {" "}
                      {ticket.priority === "high" && (
                        <Badge variant="secondary">
                          <ChevronsUp /> High
                        </Badge>
                      )}
                      {ticket.priority === "medium" && (
                        <Badge variant="outline">
                          <ChevronUp /> Medium
                        </Badge>
                      )}
                      {ticket.priority === "low" && (
                        <Badge variant="outline">
                          <Minus /> Low
                        </Badge>
                      )}
                    </p>
                  ) : (
                    <Skeleton />
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {ticket ? (
                    <div className="flex flex-col space-y-3">
                      <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inprogress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleUpdateStatus()}>
                        Set status
                      </Button>
                    </div>
                  ) : (
                    <Skeleton />
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {ticket ? (
                    <p>
                      {ticket.category.map((category, index) => (
                        <Badge key={index} className="" variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </p>
                  ) : (
                    <Skeleton />
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                  Creation Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {ticket ? (
                    <p>{formattedDate(ticket.createdAt)}</p>
                  ) : (
                    <Skeleton />
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetails;
