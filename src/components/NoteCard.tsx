"use client";

import { useRouter } from "next/navigation";

function NoteCard({ note }) {
  const router = useRouter();

  return (
    <div key={note.id} className="bg-slate-300 p-4 mb-2">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button
        onClick={async () => {
          await fetch(`/api/notes/${note.id}`, {
            method: "DELETE",
          });
          router.refresh();
        }}
      >
        delete
      </button>

      <button>
        <a href={`/notes/${note.id}`}>edit</a>
      </button>
    </div>
  );
}

export default NoteCard;
