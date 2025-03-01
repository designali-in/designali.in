"use client";

import type { Graphic } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { DIcons } from "dicons";

import { cn, formatDescription } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnimeAdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  anime: Graphic;
}

export function AnimeAdminCard({
  anime,
  className,
  ...props
}: AnimeAdminCardProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 5}>
          {anime.coverImage.length ? (
            <Link href={`/admin/graphic/${anime.id}`}>
              <Image
                src={anime.coverImage ?? "/images/anime-placeholder.png"}
                alt={anime.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            </Link>
          ) : (
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="flex h-full w-full items-center justify-center bg-secondary"
            >
              <DIcons.Package
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-[2px] p-4">
        <CardTitle className="truncate py-[2px]">{anime.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {formatDescription(anime.description, 100)}
        </CardDescription>
        <CardDescription className="line-clamp-2 py-3">
          {anime.id}
        </CardDescription>
      </CardContent>
      <CardFooter className="grid gap-2 p-4">
        <Link
          href={`/admin/graphic/${anime.id}`}
          className="w-full"
          tabIndex={-1}
        >
          <Button
            aria-label="Edit content"
            size="sm"
            className="w-full tracking-tight"
          >
            Edit Graphic
          </Button>
        </Link>
        <Link href={`/graphic/${anime.name}`} className="w-full" tabIndex={-1}>
          <Button
            variant="outline"
            aria-label="Edit content"
            size="sm"
            className="w-full tracking-tight"
          >
            View Graphic
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
