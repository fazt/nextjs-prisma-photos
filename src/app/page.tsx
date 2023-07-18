import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { prisma } from "@/lib/prisma";

function loadNotes() {
  return prisma.note.findMany();
}

async function HomePage() {
  const notes = await loadNotes();

  return (
    <div>
      <h1>Note Form</h1>

      <NoteForm />

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default HomePage;
