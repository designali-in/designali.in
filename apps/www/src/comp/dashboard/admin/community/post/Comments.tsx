/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import type { ExtendedComment } from "@/types";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/lib/constants";

import CommentCard from "./CommentCard";

interface CommentsProps {
  initialComments: ExtendedComment[];
  postId: string;
}

const InfiniteComments: FC<CommentsProps> = ({ initialComments, postId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [comments, setComments] = useState<ExtendedComment[]>(initialComments);
  const [noNewData, setNoNewData] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    ExtendedComment[]
  >(
    [`posts-infinite-query-${postId}`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/post/comment?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&postId=${postId}`;

      const { data } = await axios(queryUrl);

      setNoNewData(false);

      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialComments], pageParams: [1] },
    },
  );

  useEffect(() => {
    if (data.pages[data.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    setComments(data.pages.flatMap((page) => page) ?? initialComments);
  }, [data, initialComments]);

  useEffect(() => {
    if (entry && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  if (comments.length === 0) {
    return (
      <p className="w-full text-center text-sm text-muted-foreground">
        No comments created yet.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-6 p-6">
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <div key={comment.id} ref={ref}>
              <CommentCard comment={comment} />
            </div>
          );
        } else {
          return (
            <div key={comment.id}>
              <CommentCard comment={comment} />
            </div>
          );
        }
      })}
      {isFetchingNextPage && ""}
    </div>
  );
};

export default InfiniteComments;
