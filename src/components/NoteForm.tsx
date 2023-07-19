"use client";

import { useState, useRef, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";
import { useRouter } from "next/navigation";
import { HiSave } from "react-icons/hi";

function NoteForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const router = useRouter();
  const { createNote, selectedNote, setSelectedNote, updateNote, titleRef } =
    useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedNote) {
          await updateNote(selectedNote.id, {
            title,
            content,
          });
        } else {
          await createNote({
            title,
            content,
          });
        }

        setTitle("");
        setContent("");
        setSelectedNote(null);

        titleRef.current.focus();
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="content"
        rows={3}
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>

      <div className="flex justify-end my-2">
        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 my-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title || !content}
        >
          {selectedNote ? "Update" : "Create"}
          <HiSave className="inline-block ml-2" />
        </button>

        {selectedNote && (
          <button
            type="button"
            className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 my-2 ml-2"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
