import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

// Робимо сторінку динамічною для уникнення проблем з пререндерингом
export const dynamic = "force-dynamic";

export default async function Notes() {
  const initialQuery = "";
  const initialPage = 1;

  try {
    const initialData = await fetchNotes(initialQuery, initialPage);

    return (
      <NotesClient
        initialData={initialData}
        initialQuery={initialQuery}
        initialPage={initialPage}
      />
    );
  } catch (error) {
    console.error("Error fetching initial data:", error);

    // При помилці не передаємо initialData, щоб уникнути проблем з гідратацією
    return (
      <NotesClient initialQuery={initialQuery} initialPage={initialPage} />
    );
  }
}
