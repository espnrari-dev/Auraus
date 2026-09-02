import React, { useState } from 'react';
import useNoteStore from '../store/noteStore';

const Notes = () => {
  const { notes, addNote, deleteNote, clearNotes } = useNoteStore();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addNote(input.trim());
      setInput('');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Journal</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </form>
      {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="flex justify-between items-center p-2 border rounded">
            <span>{note.text}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {notes.length > 0 && (
        <button
          onClick={clearNotes}
          className="mt-4 text-sm text-red-500 hover:text-red-700"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default Notes;
