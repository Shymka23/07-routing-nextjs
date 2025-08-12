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

  try {
    const initialData = await fetchNotes("", 1, tag);

    return <NotesClient initialData={initialData} tag={tag} />;
  } catch (error) {
    console.error("Error fetching initial data:", error);

    // При помилці не передаємо initialData, щоб уникнути проблем з гідратацією
    return <NotesClient tag={tag} />;
  }
}
