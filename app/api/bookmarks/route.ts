import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Buscar todos os bookmarks
export async function GET() {
  const bookmarks = await prisma.bookmark.findMany({
    include: { tags: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookmarks);
}

// Criar um novo bookmark
export async function POST(request: Request) {
  const body = await request.json();
  const { title, url, description, tags } = body;

  const bookmark = await prisma.bookmark.create({
    data: {
      title,
      url,
      description,
      tags: {
        create: tags.map((tagName: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
    include: { tags: { include: { tag: true } } },
  });

  return NextResponse.json(bookmark);
}