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
