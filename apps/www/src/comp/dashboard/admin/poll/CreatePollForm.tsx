"use client";

import type {
  CreatePollValidatorServerType,
  CreatePollValidatorType,
} from "@/lib/validations/poll";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { DIcons } from "dicons";
import { useForm } from "react-hook-form";

import { CreatePollValidator } from "@/lib/validations/poll";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreatePollForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [options, setOptions] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(new Date());
  const [text, setText] = useState("");

  //react-hook-form initialization
  const form = useForm<CreatePollValidatorType>({
    resolver: zodResolver(CreatePollValidator),
    defaultValues: {
      question: "",
    },
  });

  const { mutate: createPoll, isLoading } = useMutation({
    mutationFn: async (content: CreatePollValidatorType) => {
      const payload: CreatePollValidatorServerType = {
        question: content.question,
        options,
        expiresAt,
      };

      const { data } = await axios.post("/api/poll", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/dashboard/poll");
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Your poll was created.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 409) {
          return toast({
            title: "Error!",
            description: "This poll already exists. Try changing the question.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description:
              "Either the expiry data was not provided or one of the option was too long.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are creating your poll.",
      });
    },
  });

  function onSubmit(content: CreatePollValidatorType) {
    if (!expiresAt) {
      return toast({
        title: "Error!",
        description: "You have to set an expiry date.",
        variant: "destructive",
      });
    }

    if (options.length < 2 || options.length > 10) {
      return toast({
        title: "Error!",
        description: "Poll must have between 2 and 10 options.",
        variant: "destructive",
      });
    }

    createPoll(content);
  }

  const handleAddOption = () => {
    if (text.length === 0 || text.length > 80) {
      return toast({
        title: "Error!",
        description: "Option must be between 1 and 80 characters.",
        variant: "destructive",
      });
    }

    const findOption = options.find((option) => option === text);

    if (findOption) {
      return toast({
        title: "Error!",
        description: "Option already exists.",
        variant: "destructive",
      });
    }

    setOptions([...options, text]);
    setText("");
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type poll question here."
                  {...field}
                  disabled={isLoading}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormItem className="space-y-3">
            <div className="flex items-center gap-x-2">
              <FormLabel>Option</FormLabel>
              <DIcons.Info className="h-3 w-3 text-muted-foreground" />
            </div>
            <FormControl>
              <>
                <Input
                  placeholder="Type poll option here."
                  disabled={isLoading}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddOption}
                    type="button"
                  >
                    Add option
                    <DIcons.Plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            </FormControl>
            <FormMessage />
          </FormItem>

          {options.length > 0 && (
            <div className="space-y-2">
              <FormLabel>Poll options</FormLabel>
              {options.map((option, index) => (
                <Card key={index} className="flex items-center">
                  <CardHeader className="w-full px-3 py-2">
                    <span className="text-sm">{option}</span>
                  </CardHeader>
                  <DIcons.Delete
                    className="mr-3 h-3.5 w-3.5 cursor-pointer transition hover:text-muted-foreground"
                    onClick={() =>
                      setOptions(options.filter((item) => item !== option))
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </div>

        <FormItem className="flex flex-col space-y-3">
          <div className="flex items-center gap-x-2">
            <FormLabel>Expiry Date</FormLabel>
            <DIcons.Info className="h-3 w-3 text-muted-foreground " />
          </div>
          <FormControl>
            <DatePicker value={expiresAt} setValue={setExpiresAt} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button className="w-fit" disabled={isLoading} size="sm">
          {isLoading && (
            <DIcons.Loader
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create
          <span className="sr-only">Create poll</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreatePollForm;
