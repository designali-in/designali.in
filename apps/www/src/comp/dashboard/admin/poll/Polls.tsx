"use client";

import type { ExtendedPoll } from "@/types";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/lib/constants";

import PollCard from "./PollCard";

interface PollsProps {
  initialPolls: ExtendedPoll[];
  interaction?: boolean;
  sessionId: string;
}

const Polls: FC<PollsProps> = ({ initialPolls, interaction, sessionId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [polls, setPolls] = useState(initialPolls);
  const [noNewData, setNoNewData] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const pollInfiniteQueryKey = interaction
    ? ["polls-infinite-query"]
    : ["polls-infinite-query-results"];

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      pollInfiniteQueryKey,
      async ({ pageParam = 1 }) => {
        const expiresAt = interaction ? "gt" : "lte";

        const queryUrl = `/api/poll?limit=${INFINITE_SCROLLING_PAGINATION_BROWSE}&page=${pageParam}&expiresAt=${expiresAt}`;

        const { data } = await axios(queryUrl);

        return data as ExtendedPoll[];
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialPolls], pageParams: [1] },
      },
    );

  useEffect(() => {
    if (data.pages[data.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    if (isFetching) return;

    setPolls(data.pages.flatMap((page) => page) ?? initialPolls);
  }, [data, initialPolls, isFetching]);

  useEffect(() => {
    if (entry && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  return (
    <div className="w-full">
      {polls.map((poll, index) => {
        if (index === polls.length - 1) {
          return (
            <div key={poll.id} ref={ref}>
              <PollCard
                poll={poll}
                interaction={interaction}
                sessionId={sessionId}
              />
            </div>
          );
        } else {
          return (
            <div key={poll.id}>
              <PollCard
                poll={poll}
                interaction={interaction}
                sessionId={sessionId}
              />
            </div>
          );
        }
      })}
      {isFetchingNextPage && ""}
      {polls.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No polls found.
        </p>
      )}
    </div>
  );
};

export default Polls;
