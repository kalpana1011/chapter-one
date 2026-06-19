"use client";

import { useActionState, useState } from "react";
import AddButton from "./AddButton";
import { addBookToReadingList } from "../actions/actions";
import StatusToast from "./StatusToast";
import Image from "next/image";

interface BookCardProps {
  openLibraryKey: string;
  title: string;
  author: string;
  publishYear: number;
  coverId?: number;
  fallbackUrl?: string;
  showAddToReadingList?: boolean;
}

export default function BookCard({
  openLibraryKey,
  title,
  author,
  publishYear,
  coverId,
  fallbackUrl,
  showAddToReadingList = true,
}: BookCardProps) {
  const [state, formAction] = useActionState(addBookToReadingList, null);

  const finalCoverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : fallbackUrl || "";

  const [manualCloseKey, setManualCloseKey] = useState(0);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);

  const shouldShowToast = state?.message && !isManuallyClosed;

  const handleSubmit = (formData: FormData) => {
    setIsManuallyClosed(false);
    formAction(formData);
  };

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 relative group">
        <div>
          <div className="w-full aspect-3/4 bg-slate-50 border border-slate-100/60 rounded-lg mb-4 overflow-hidden relative flex items-center justify-center shadow-inner">
            {finalCoverUrl ? (
              <Image
                src={finalCoverUrl}
                alt={title}
                width={150}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center select-none">
                <span className="text-3xl">📖</span>
                <span className="text-md uppercase tracking-wider text-[#75879f] font-bold">
                  No Cover
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3
              className="font-sans text-xl font-bold text-slate-900 tracking-tight line-clamp-2 min-h-10"
              title={title}
            >
              {title}
            </h3>
            <div>
              <p className="text-lg text-slate-500  truncate">By {author}</p>
              <p className="text-md text-[#75879f] font-mono mt-0.5">
                Year: {publishYear > 0 ? publishYear : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <form
          action={handleSubmit}
          className="mt-4 pt-3 border-t border-slate-50"
        >
          <input type="hidden" name="openLibraryKey" value={openLibraryKey} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="author" value={author} />
          <input type="hidden" name="publishYear" value={publishYear} />
          <input type="hidden" name="coverUrl" value={finalCoverUrl} />

          {showAddToReadingList && <AddButton />}
        </form>
      </div>
      {shouldShowToast && (
        <StatusToast
          key={`${state.message}-${manualCloseKey}`}
          message={state.message}
          success={state.success}
          onClose={() => {
            setIsManuallyClosed(true);
            setManualCloseKey((prev) => prev + 1);
          }}
        />
      )}
    </>
  );
}
