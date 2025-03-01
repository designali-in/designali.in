"use client";

import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner() {
  return (
    <div className="mt-10">
      <Carousel className="w-full">
        <CarouselContent className="h-[420px] md:h-[730px]">
          <CarouselItem className="">
            <Card>
              <CardContent className="flex items-center justify-center p-2">
                <Image
                  src={
                    "https://utfs.io/f/135dd89c-ba54-4670-8762-429d38093fca-tmf49m.png"
                  }
                  alt={""}
                  className="h-[400px] w-full rounded-lg object-cover object-center md:h-[700px]"
                  width={1000}
                  height={600}
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="">
            <Card>
              <CardContent className="flex items-center justify-center p-2">
                <Image
                  src={
                    "https://utfs.io/f/8671e2d6-802d-48b3-943a-a18cb5169f48-lyh2sl.jpg"
                  }
                  alt={""}
                  className="h-[400px] w-full rounded-lg object-cover object-center md:h-[700px]"
                  width={1000}
                  height={600}
                />
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem className="">
            <Card>
              <CardContent className="flex items-center justify-center p-2">
                <Image
                  src={
                    "https://utfs.io/f/4cdd093b-a611-4487-aa06-ed35fb2c2634-lyh2sm.jpg"
                  }
                  alt={""}
                  className="h-[400px] w-full rounded-lg object-cover object-center md:h-[700px]"
                  width={1000}
                  height={600}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <div className="right-8 mt-10 flex justify-center gap-3 md:absolute md:-mt-16">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
