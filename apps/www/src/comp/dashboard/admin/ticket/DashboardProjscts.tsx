"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DIcons } from "dicons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProjectList from "./ProjectList";

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
  messages?: string | null;
  status?: string | null;
  project: Project;
  category: string[];
  priority: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

const DashboardProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>(""); // State to store the filter option

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project");
        const data = await response.json();
        setLoadingProjects(false);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (projects.length > 0) {
          const projectId = projects[0].id;
          const response = await fetch(`/api/ticket?projectId=${projectId}`);
          const data = await response.json();
          setTickets(data);
          setLoadingTickets(false);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [projects]);

  const noProject = projects[0] === undefined || projects[0] === null;
  const noTickets = tickets[0] === undefined || tickets[0] === null;

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const filteredTickets = filter
    ? tickets.filter((ticket) => ticket.status === filter)
    : tickets.filter((ticket) => ticket.status !== "archived");

  const filteredProjects = filter
    ? projects.filter((project) => project.id)
    : projects.filter((project) => project.id !== "archived");

  return (
    <div className="">
      {!noProject && !noTickets && (
        <div className="flex w-full justify-between gap-2 py-6 ">
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All</SelectLabel>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={() => setFilter("")}>Reset Filter</Button>
        </div>
      )}
      <p className="text-xs text-slate-500 md:hidden">
        Some details are hidden on mobile. For more details, please visit on
        your computer.{" "}
      </p>
      {loadingProjects ? (
        <div className="flex h-full items-center justify-center text-7xl ">
          <DIcons.Loader className="animate-spin" />
        </div>
      ) : (
        <>
          {projects.length === 0 ? null : loadingTickets ? (
            <ProjectList
              lite={false}
              projects={filteredProjects}
              projectName={projects[0].projectName}
            />
          ) : filteredTickets.length > 0 ? (
            <ProjectList
              lite={false}
              projects={filteredProjects}
              projectName={projects[0].projectName}
            />
          ) : (
            <div>
              <p>Nothing here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardProjects;
