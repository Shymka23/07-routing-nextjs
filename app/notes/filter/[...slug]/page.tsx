import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

// Робимо сторінку динамічною для уникнення проблем з пререндерингом
export const dynamic = "force-dynamic";

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Notes({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const initialQuery = "";
  const initialPage = 1;

  try {
    const initialData = await fetchNotes(initialQuery, initialPage, tag);

    return (
      <NotesClient
        initialData={initialData}
        initialQuery={initialQuery}
        initialPage={initialPage}
        tag={tag}
      />
    );
  } catch (error) {
    console.error("Error fetching initial data:", error);

    // При помилці не передаємо initialData, щоб уникнути проблем з гідратацією
    return (
      <NotesClient
        initialQuery={initialQuery}
        initialPage={initialPage}
        tag={tag}
      />
    );
  }
}
