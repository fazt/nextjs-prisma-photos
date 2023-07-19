"use client";

import { Note } from "@prisma/client";
import { createContext, useContext, useState, useRef } from "react";

const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => void;
  createNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, note: Note) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  titleRef: any;
}>({
  notes: [],
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const titleRef = useRef(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note) {
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

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
  }

  async function updateNote(id, note) {
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note.id === id);
    newNotes[index] = note;
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
