import NotePreviewClient from "./NotePreview.client";

export default function NotePreviewPage({
  params,
}: {
  params: { id: string };
}) {
  return <NotePreviewClient params={params} />;
}
