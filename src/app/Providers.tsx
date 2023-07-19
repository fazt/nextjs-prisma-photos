"use client";

import { NotesProvider } from "@/context/NoteContext";

export function Providers({ children }) {
  return <NotesProvider>{children}</NotesProvider>;
}
