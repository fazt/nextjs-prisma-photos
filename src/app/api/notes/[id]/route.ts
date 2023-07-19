import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const note = await prisma.note.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(note);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();

  const note = await prisma.note.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(note);
}
