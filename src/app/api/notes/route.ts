import { NextResponse } from "next/server";
import {} from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
