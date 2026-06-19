"use client";

import { useActionState, useState } from "react";
import { updateBookInReadingList } from "../actions/actions";
import StatusToast from "./StatusToast";

interface UpdateBookFormProps {
  bookId: string;
  initialStatus: "Unread" | "Reading" | "Completed";
  initialNotes: string;
}

export default function UpdateBookForm({
  bookId,
  initialStatus,
  initialNotes,
}: UpdateBookFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateBookInReadingList,
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [manualCloseKey, setManualCloseKey] = useState(0);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);

  const shouldShowToast = state?.message && !isManuallyClosed;

  const handleSubmit = (formData: FormData) => {
    setIsManuallyClosed(false);
    setIsEditing(false);
    formAction(formData);
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      {!isEditing ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg">
            <span className="text-[#75879f] text-lg font-mono uppercase tracking-wider mt-2 text-md">
              Status
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-md font-bold ${
                initialStatus === "Completed"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                  : initialStatus === "Reading"
                    ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                    : "bg-slate-100 text-[#75879f]"
              }`}
            >
              {initialStatus}
            </span>
          </div>
          {initialNotes && (
            <p className="text-md text-[#75879f] m-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic line-clamp-2">
              &ldquo;{initialNotes}&rdquo;
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setIsManuallyClosed(true);
              setIsEditing(true);
            }}
            className="w-full mt-3 mr-3 p-2 text-center border border-slate-300 text-[#02698b] hover:text-indigo-800 font-semibold text-md transition-colors cursor-pointer"
          >
            Update Logs & Notes 📝
          </button>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-2.5">
          <input type="hidden" name="id" value={bookId} />

          <div>
            <label className="block text-md font-bold uppercase tracking-wider text-[#75879f] mb-1">
              Log Status
            </label>
            <select
              name="readingStatus"
              defaultValue={initialStatus}
              disabled={isPending}
              className="w-full p-2 bg-white border border-slate-200 text-lg rounded-lg text-slate-800 focus:outline-hidden focus:border-indigo-500 transition-colors disabled:opacity-60"
            >
              <option value="Unread">Unread</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-md font-bold uppercase tracking-wider text-[#75879f] mb-1">
              Personal Notes
            </label>
            <textarea
              name="personalNotes"
              defaultValue={initialNotes}
              disabled={isPending}
              placeholder="Add your reading thoughts..."
              rows={2}
              className="w-full p-2 bg-white border border-slate-200 text-lg rounded-lg text-slate-800 placeholder:text-slate-300 focus:outline-hidden focus:border-indigo-500 transition-colors resize-none disabled:opacity-60"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setIsEditing(false)}
              className="w-1/2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-md font-bold rounded-lg cursor-pointer transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="w-1/2 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-md font-bold rounded-lg cursor-pointer transition-colors flex items-center justify-center disabled:bg-indigo-400"
            >
              {isPending ? "Saving..." : "Save Edits"}
            </button>
          </div>
        </form>
      )}

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
    </div>
  );
}
