"use client";

import { useActionState, useState } from "react";
import { handleReadingListDeleteAction } from "../actions/actions";
import RemoveButton from "../components/RemoveButton";
import UpdateBookForm from "../components/UpdateBookForm";
import StatusToast from "../components/StatusToast";
import PageLimitSelector from "../components/PageLimitSelector";
import Image from "next/image";

interface SerializedBook {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  coverUrl?: string;
  readingStatus: "Unread" | "Reading" | "Completed";
  personalNotes?: string;
}

interface ReadingListClientProps {
  initialBooks: SerializedBook[];
  currentPage: number;
  totalPages: number;
  currentLimit: number;
  errorMsg: string;
}

export default function ReadingListClient({
  initialBooks,
  currentPage,
  totalPages,
  currentLimit,
  errorMsg,
}: ReadingListClientProps) {
  const [state, formAction] = useActionState(
    handleReadingListDeleteAction,
    null,
  );

  const [manualCloseKey, setManualCloseKey] = useState(0);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);

  const shouldShowToast = state?.message && !isManuallyClosed;

  const handleSubmit = (formData: FormData) => {
    setIsManuallyClosed(false);
    formAction(formData);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8 bg-slate-50 text-slate-900 antialiased">
      <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#f35c05]">
            My Private Reading List
          </h2>
          <p className="text-lg text-slate-500  font-bold mt-0.5">
            Your personal bookshelf. These entries are isolated to your browser
            session.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <PageLimitSelector
            currentLimit={currentLimit}
            baseUrl="/reading-list"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-900 rounded-xl text-lg font-semibold max-w-xl mx-auto text-center">
          {errorMsg}
        </div>
      )}

      {!errorMsg && (
        <>
          {initialBooks.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl max-w-xl mx-auto w-full shadow-2xs">
              <span className="text-4xl block mb-3">📚</span>
              <h3 className="text-md font-bold text-slate-800 mb-1">
                Your bookshelf is empty
              </h3>
              <p className="text-lg text-[#75879f] max-w-xs mx-auto mb-6">
                Explore the global catalogue to add records here.
              </p>
              <a
                href="/books"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-lg transition-colors shadow-xs"
              >
                Browse Catalog
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {initialBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-col justify-between p-4 shadow-2xs hover:shadow-md transition-all duration-300 relative group"
                >
                  <div>
                    <div className="w-full aspect-3/4 bg-slate-50 border border-slate-100/60 rounded-lg mb-4 overflow-hidden relative flex items-center justify-center shadow-inner">
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          height={150}
                          width={150}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                          <span className="text-3xl">📖</span>
                          <span className="text-md uppercase tracking-wider text-[#75879f] font-bold">
                            No Cover
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-50 p-3 m-1">
                      <h3
                        className="text-xl font-bold font-sans text-[#06393e] tracking-tight mb-1 line-clamp-2 min-h-10"
                        title={book.title}
                      >
                        {book.title}
                      </h3>
                      <div>
                        <p className="text-md text-[#06393e] font-bold font-serif truncate">
                          By {book.author}
                        </p>
                        <p className="text-md text-[#06393e] font-bold font-mono mt-0.5">
                          Year:{" "}
                          {book.publishYear > 0 ? book.publishYear : "N/A"}
                        </p>
                      </div>
                    </div>

                    <UpdateBookForm
                      bookId={book.id}
                      initialStatus={book.readingStatus}
                      initialNotes={book.personalNotes || ""}
                    />
                  </div>

                  <form
                    action={handleSubmit}
                    className="mt-4 pt-3 border-t border-slate-50"
                  >
                    <input type="hidden" name="id" value={book.id} />
                    <RemoveButton />
                  </form>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 border-t border-slate-100 pt-8 mt-4">
              <a
                href={
                  currentPage > 1
                    ? `/reading-list?page=${currentPage - 1}`
                    : "#"
                }
                className={`px-4 py-2 bg-white border border-slate-200 text-lg font-bold text-slate-700 rounded-lg transition-all hover:bg-slate-50 ${
                  currentPage === 1
                    ? "pointer-events-none opacity-40 shadow-none"
                    : "shadow-2xs"
                }`}
              >
                ← Previous
              </a>
              <span className="text-lg text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200/50">
                Page {currentPage} of {totalPages}
              </span>
              <a
                href={
                  currentPage < totalPages
                    ? `/reading-list?page=${currentPage + 1}`
                    : "#"
                }
                className={`px-4 py-2 bg-white border border-slate-200 text-lg font-bold text-slate-700 rounded-lg transition-all hover:bg-slate-50 ${
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-40 shadow-none"
                    : "shadow-2xs"
                }`}
              >
                Next →
              </a>
            </div>
          )}
        </>
      )}

      {shouldShowToast && (
        <StatusToast
          key={`${state.message}-${manualCloseKey}`}
          message={state.message}
          success={state.success}
          onClose={() => {
            setIsManuallyClosed(false);
            setManualCloseKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}
