import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    console.log(title, content);

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    console.log(newNote);

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
