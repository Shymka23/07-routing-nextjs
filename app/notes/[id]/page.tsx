import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  if (!id || id.trim() === "") {
    throw new Error("Invalid note ID");
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    // Prefetch error will be handled by the client component
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
