"use client";

import { useNotes } from "@/context/NoteContext";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HiTrash, HiPencil } from "react-icons/hi";

function NoteCard({ note }: { note: Note }) {
  const router = useRouter();
  const { deleteNote, setSelectedNote, titleRef} = useNotes();

  return (
    <div key={note.id} className="bg-slate-300 p-4 mb-2 flex justify-between">
      <div>
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <p>{note.content}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={async () => {
            if (confirm("Are you sure?")) {
              await deleteNote(note.id);
            }
          }}
        >
          <HiTrash className="text-2xl text-red-600" />
        </button>

        <button
          onClick={() => {
            setSelectedNote(note);
            titleRef.current.focus();
          }}
        >
          <HiPencil className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
