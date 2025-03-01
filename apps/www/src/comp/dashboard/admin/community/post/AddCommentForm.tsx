"use client";

import type {
  CommentValidatorType,
  ServerCommentValidatorType,
} from "@/lib/validations/community";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { DIcons } from "dicons";
import { useForm } from "react-hook-form";

import { CreateCommentValidator } from "@/lib/validations/community";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const AddCommentForm = ({ postId }: { postId: string }) => {
  const { loginToast, endErrorToast } = useAuthToast();
  const queryClient = useQueryClient();

  //react-hook-form initialization
  const form = useForm<CommentValidatorType>({
    resolver: zodResolver(CreateCommentValidator),
    defaultValues: {
      text: "",
    },
  });

  const { mutate: addComment, isLoading } = useMutation({
    mutationFn: async (content: CommentValidatorType) => {
      const payload: ServerCommentValidatorType = {
        text: content.text,
        postId,
      };

      const { data } = await axios.post("/api/post/comment", payload);
      return data;
    },
    onSuccess: () => {
      form.reset();
      queryClient.resetQueries([`posts-infinite-query-${postId}`]);

      toast({
        title: "Success!",
        description: "Comment added successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Post does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Comment cannot be empty.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are adding your comment.",
      });
    },
  });

  function onSubmit(content: CommentValidatorType) {
    addComment(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <Textarea
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      addComment(form.getValues());
                    }
                  }}
                  placeholder="Type your comment here."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isLoading} size="sm">
          {isLoading && (
            <DIcons.Loader
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Comment
          <span className="sr-only">Add your comment</span>
        </Button>
      </form>
    </Form>
  );
};

export default AddCommentForm;
