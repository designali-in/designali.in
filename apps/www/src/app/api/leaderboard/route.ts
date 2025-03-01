import { z } from "zod";

import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const leaderboardAnimes = await prisma.graphic.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: [
        {
          totalRatings: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        rating: true,
      },
    });

    return new Response(JSON.stringify(leaderboardAnimes));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
