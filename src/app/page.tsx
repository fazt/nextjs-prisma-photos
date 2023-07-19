"use client";

import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { prisma } from "@/lib/prisma";
import { useNotes } from "@/context/NoteContext";
import { useEffect } from "react";

function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div>
      <h1 className="text-3xl font-bold text-white text-center my-4">Notes App</h1>

      <NoteForm />

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      </div>
    </div>
  );
}

export default HomePage;
