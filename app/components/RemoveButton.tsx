"use client";

import { useFormStatus } from "react-dom";

export default function RemoveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 bg-white text-rose-600 hover:text-white hover:bg-rose-600 border border-slate-300 hover:border-rose-600 text-lg font-semibold rounded-lg transition-all duration-150 disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
    >
      {pending ? "Dropping Record..." : "Remove Volume ✕"}
    </button>
  );
}
