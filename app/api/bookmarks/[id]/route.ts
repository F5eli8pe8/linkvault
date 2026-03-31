import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = parseInt(rawId);

  await prisma.bookmarkTag.deleteMany({ where: { bookmarkId: id } });
  await prisma.bookmark.delete({ where: { id } });

  return NextResponse.json({ message: "Deletado com sucesso" });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = parseInt(rawId);
  const body = await request.json();

  const bookmark = await prisma.bookmark.update({
    where: { id },
    data: { favorite: body.favorite },
  });

  return NextResponse.json(bookmark);
}
