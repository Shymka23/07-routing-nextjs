"use client";

import css from "./NotePage.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";

import { NotesResponse } from "@/types/note";
import Pagination from "@/components/Pagination/Pagination";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { ErrorMessageEmpty } from "@/components/ErrorMessageEmpty/ErrorMessageEmpty";
import NoteList from "@/components/NoteList/NoteList";
import { Modal } from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import { SearchBox } from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  initialData?: NotesResponse;
  initialQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialData,
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
    // Використовуємо initialData тільки для початкового запиту
    initialData:
      query === initialQuery && currentPage === initialPage && initialData
        ? initialData
        : undefined,
    refetchOnMount: false,
    // Якщо немає initialData, завантажуємо дані одразу
    enabled: true,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  const handleCreateNote = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setCurrentPage(1);
    },
    1000
  );

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        )}
        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </div>

      {isLoading && <Loader />}

      {isError && (
        <div className={css.errorContainer}>
          <ErrorMessage />
          <button onClick={handleRetry} className={css.retryButton}>
            Try again
          </button>
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      {isSuccess && notes.length === 0 && <ErrorMessageEmpty />}

      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
