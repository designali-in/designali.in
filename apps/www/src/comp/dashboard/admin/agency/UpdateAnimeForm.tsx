/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type {
  AnimeSchemaType,
  IdAnimeSchemaType,
} from "@/src/lib/validations/graphic";
import type { Graphic } from "@prisma/client";
import type { FC } from "react";
import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@/comp/uis/combobox";
import { catalogs } from "@/src/data/agency";
import { animeSchema } from "@/src/lib/validations/graphic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { DIcons } from "dicons";
import { useForm } from "react-hook-form";

import { uploadFiles } from "@/lib/uploadthing";
import { capitalizeFirstCharacter, cn } from "@/lib/utils";
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

import CustomAlertBox from "./CustomAlertBox";

interface UpdateAnimeFormProps {
  anime: Graphic;
}

const UpdateAnimeForm: FC<UpdateAnimeFormProps> = ({ anime }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [file, setFile] = useState<File | null>(null);
  const [genre, setGenre] = useState(anime.genre);

  //react-hook-form initialization
  const form = useForm<AnimeSchemaType>({
    resolver: zodResolver(animeSchema),
    defaultValues: {
      name: anime.name,
      description: anime.description,
      director: anime.director,
      genre: anime.genre,
      releaseYear: anime.releaseYear,
      trailerLink: anime.trailerLink,
    },
  });

  const { mutate: updateAnime, isLoading } = useMutation({
    mutationFn: async (content: AnimeSchemaType) => {
      let fileUrl = anime.coverImage ?? null;

      if (file) {
        const { url } = await uploadByFile(file);
        fileUrl = url;
      }

      const payload = { ...content, genre, coverImage: fileUrl, id: anime.id };

      const { data } = await axios.patch("/api/graphic", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/admin/graphic");
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "This anime was updated successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Forbidden!",
            description: "You are not authorized to add anime.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "Conflict!",
            description: "Anime already exists.",
            variant: "destructive",
          });
        }
        if (statusCode === 400) {
          return toast({
            title: "Error!",
            description: "Cover image is missing.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  const { mutate: deleteAnime, isLoading: deleteLoader } = useMutation({
    mutationFn: async () => {
      const payload: IdAnimeSchemaType = { id: anime.id };

      const { data } = await axios.post("/api/graphic/delete", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/admin/graphic");
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Anime deleted successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Forbidden!",
            description: "You are not authorized to delete this anime.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are deleting this anime.",
      });
    },
  });

  async function uploadByFile(file: File) {
    // upload to uploadthing
    const [res] = await uploadFiles({
      endpoint: "imageUploader",
      files: [file],
    });

    return {
      url: res.fileUrl,
    };
  }

  function onSubmit(content: AnimeSchemaType) {
    updateAnime(content);
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
                  placeholder="Type anime name here."
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
                  placeholder="Type anime description here."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Director</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type anime director here."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Combobox
                  data={catalogs}
                  placeholder="Select genre..."
                  selectedOption={capitalizeFirstCharacter(genre)}
                  setState={setGenre}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type release year of anime here."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailerLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailor Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a trailer link."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileInput
                  setFile={setFile}
                  placeholder="Enter a trailer link."
                  disabled={isLoading}
                  {...field}
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
            Update Anime
            <span className="sr-only">Update Anime</span>
          </Button>
          <CustomAlertBox
            description="This action cannot be undone. This will permanently delete this anime from our servers."
            onClick={() => deleteAnime()}
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
              {deleteLoader ? "Deleting" : "Delete Anime"}
              <span className="sr-only">Delete Anime</span>
            </span>
          </CustomAlertBox>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAnimeForm;

const FileInput = forwardRef<
  HTMLInputElement,
  {
    setFile: (file: File | null) => void;
    placeholder: string;
    disabled?: boolean;
  }
>(({ setFile, placeholder, disabled }, ref) => {
  return (
    <input
      type="file"
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
        }
      }}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      accept="image/*"
      ref={ref}
    />
  );
});

FileInput.displayName = "FileInput";
