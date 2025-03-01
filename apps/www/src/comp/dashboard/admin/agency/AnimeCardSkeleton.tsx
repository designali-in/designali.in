import { DIcons } from "dicons";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AnimeCardSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-3">
      {Array.from({ length }).map((_, index) => (
        <SingleAnimeCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default AnimeCardSkeleton;

export const SingleAnimeCardSkeleton = () => {
  return (
    <div className="">
      <Card className="rounded-sm">
        <CardHeader className="border-b p-0">
          <AspectRatio>
            <div className="flex h-full items-center justify-center bg-secondary">
              <DIcons.Image
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </AspectRatio>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
      </Card>
    </div>
  );
};
