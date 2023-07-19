"use client";

import { Note } from "@prisma/client";
import { createContext, useContext, useState, useRef } from "react";

const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => void;
  createNote: (note: { title: string; content: string }) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, note: { title?: string; content?: string }) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  titleRef: any;
}>({
  notes: [],
  loadNotes: () => {},
  createNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  selectedNote: null,
  setSelectedNote: () => {},
  titleRef: null,
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const titleRef = useRef(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note: { title: string; content: string }) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  async function deleteNote(id: number) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
  }

  async function updateNote(
    id: number,
    note: {
      title?: string;
      content?: string;
    }
  ) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const newNote = await res.json();

    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note.id === id);
    newNotes[index] = newNote;
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        updateNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        titleRef,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
