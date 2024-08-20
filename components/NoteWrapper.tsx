import Note from "./Note"

import { useState } from "react"

export default function NoteWrapper() {
  const [notes, setNotes] = useState<number[]>([])

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note !== id))
  }
  return (
    <div>
      {notes.map((note) => (
        <Note key={note} id={note} deleteNote={deleteNote} />
      ))}
      <button
        onClick={() => setNotes([...notes, notes.length + 1])}
        className="bg-blue-500 text-white p-2 hover:translate-y-[-3px] hover:scale-[1.02] duration-300 transition-all rounded-lg border border-blue-200 drop-shadow-md"
        style={{
          boxShadow: "inset 0px 0px 3px 2px rgba(220,220, 160, 0.5)",
        }}
      >
        Add Note
      </button>
    </div>
  )
}
