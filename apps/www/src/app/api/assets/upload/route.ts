import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/session";

import cloudinary from "@/lib/cloud";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getCurrentUser();

  if (!session || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const downloadlink = formData.get("downloadlink") as string;
  const files = formData.getAll("files") as File[];
  const tags = formData.get("tags") as string;
  const category = formData.get("category") as string;

  if (!title || files.length === 0 || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const fileBuffer = await file.arrayBuffer();
      const fileBase64 = Buffer.from(fileBuffer).toString("base64");
      const fileUri = `data:${file.type};base64,${fileBase64}`;

      return cloudinary.uploader.upload(fileUri, {
        folder: "digital-assets",
      });
    });

    const uploadResponses = await Promise.all(uploadPromises);

    const tagArray = tags ? JSON.parse(tags) : [];

    const asset = await prisma.asset.create({
      data: {
        title,
        description,
        downloadlink,
        url: uploadResponses.map((response) => response.secure_url).join(","),
        user: {
          connect: {
            id: session.id,
          },
        },
        tags: {
          connectOrCreate: tagArray.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
      include: {
        tags: true,
        category: true,
      },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Error uploading files" },
      { status: 500 },
    );
  }
}
