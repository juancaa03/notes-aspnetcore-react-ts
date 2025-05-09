import { useState, useEffect, useCallback } from "react";
import { fetchNotes, createNote } from "./api";
import type { Note } from "./types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newNote = await createNote({ title, content });
      setNotes((prev) => [...prev, newNote]);
      setTitle("");
      setContent("");
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  return (
    <div className="w-screen min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center p-9">My Notes</h1>

      <div className="flex flex-1 w-full max-w-4xl gap-10">
        <div className="w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 w-full"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="border p-2 w-full h-32"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Note
            </button>
          </form>
        </div>

        <div className="w-1/2 flex flex-col">
          <button
            onClick={() => setShowContent((s) => !s)}
            className="self-end mb-4"
          >
            {showContent ? "Hide contents" : "Show contents"}
          </button>

          {loading && <p className="self-center">Loading notes...</p>}
          {error && <p className="self-center text-red-500">Error: {error}</p>}

          <ul className="space-y-4">
            {notes.map((n) => (
              <li
                key={n.id}
                className="border p-4 rounded shadow-sm"
              >
                <h2 className="font-semibold">{n.title}</h2>
                {showContent && <p className="mt-2">{n.content}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
