"use client";

import { useRouter } from "next/navigation";

function NoteForm() {
  const router = useRouter()
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        const res = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newNote = await res.json();

        console.log(newNote);
        router.refresh();

       e.target.reset(); 
      }}
    >
      <input type="text" name="title" autoFocus />
      <textarea name="content" rows={10}></textarea>
      <button>Save</button>
    </form>
  );
}

export default NoteForm;