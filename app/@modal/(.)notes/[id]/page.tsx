import NotePreviewClient from "./NotePreview.client";

// У випадку перехоплення маршрутів Next.js обробляє params асинхронно,
// передаючи їх як Promise. TypeScript не може коректно це визначити
// на рівні серверного компонента, тому ми відключаємо перевірку типів
// для цієї конкретної ситуації.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NotePreviewPage(props: any) {
  return <NotePreviewClient {...props} />;
}
