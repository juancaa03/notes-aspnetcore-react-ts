import type { Note } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${API_URL}/notes`);
  if (!res.ok) {
    throw new Error(`Error al cargar notas: ${res.status}`);
  }
  return res.json();
}

export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    throw new Error(`Error al crear nota: ${res.status}`);
  }
  return res.json();
}
