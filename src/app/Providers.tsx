"use client";

import { NotesProvider } from "@/context/NoteContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NotesProvider>{children}</NotesProvider>;
}
