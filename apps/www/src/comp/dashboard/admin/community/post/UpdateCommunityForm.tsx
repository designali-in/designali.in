"use client";

import type {
  CreateCommunityValidatorType,
  EditCommunityValidatorType,
} from "@/lib/validations/community";
import type { IdAnimeSchemaType } from "@/src/lib/validations/graphic";
import type { Community } from "@prisma/client";
import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@/comp/uis/combobox";
import { categories } from "@/data/community";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { DIcons } from "dicons";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { createCommunityValidator } from "@/lib/validations/community";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CustomAlertBox from "../../agency/CustomAlertBox";

interface UpdateCommunityFormProps {
  community: Community;
}

const UpdateCommunityForm: FC<UpdateCommunityFormProps> = ({ community }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [category, setCategory] = useState(community.category);

  //react-hook-form initialization
  const form = useForm<CreateCommunityValidatorType>({
    resolver: zodResolver(createCommunityValidator),
    defaultValues: {
      name: community.name,
      description: community.description,
      category: community.category,
    },
  });

  const { mutate: updateCommunity, isLoading } = useMutation({
    mutationFn: async (content: CreateCommunityValidatorType) => {
      const payload: EditCommunityValidatorType = {
        name: content.name,
        description: content.description,
        communityId: community.id,
        category,
      };

      const { data } = await axios.patch("/api/community", payload);
      return data;
    },
    onSuccess: () => {
      router.push(
        `/dashboard/community/${category.toLowerCase()}/${community.id}`,
      );
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Community updated successfully.",
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
            title: "This name already exists.",
            description: "Please choose another name.",
            variant: "destructive",
          });
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Community not found.",
            variant: "destructive",
          });
        }
        if (statusCode === 403) {
          return toast({
            title: "Unauthorized",
            description: "You can only edit the communities you create.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Category is required.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are updating this community.",
      });
    },
  });

  const { mutate: deleteCommunity, isLoading: deleteLoader } = useMutation({
    mutationFn: async () => {
      const payload: IdAnimeSchemaType = { id: community.id };

      const { data } = await axios.post("/api/community/delete", payload);
      return data;
    },
    onSuccess: () => {
      router.push(`/community/${community.category.toLowerCase()}`);
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Community deleted successfully.",
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
            description: "Community not found.",
            variant: "destructive",
          });
        }
        if (statusCode === 403) {
          return toast({
            title: "Unauthorized",
            description: "You can only delete the communities you create.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are deleting your community.",
      });
    },
  });

  function onSubmit(content: CreateCommunityValidatorType) {
    updateCommunity(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type community name here."
                  {...field}
                  disabled={isLoading}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type community description here."
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      updateCommunity(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  data={categories}
                  placeholder="Select category..."
                  selectedOption={
                    category.charAt(0).toUpperCase() + category.slice(1)
                  }
                  setState={setCategory}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-3">
          <Button
            className="w-fit"
            disabled={isLoading}
            type="submit"
            size="sm"
          >
            {isLoading && (
              <DIcons.Loader
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Community
            <span className="sr-only">Update Community</span>
          </Button>
          <CustomAlertBox
            description="This action cannot be undone. This will permanently delete this community from our servers."
            onClick={() => deleteCommunity()}
          >
            <span
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" }),
                "w-fit ",
                {
                  "pointer-events-none opacity-50": deleteLoader,
                },
              )}
            >
              {deleteLoader && (
                <DIcons.Loader
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {deleteLoader ? "Deleting" : "Delete"}
              <span className="sr-only">Delete Community</span>
            </span>
          </CustomAlertBox>
        </div>
      </form>
    </Form>
  );
};

export default UpdateCommunityForm;
