"use client";

import { useEffect } from "react";

interface StatusToastProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

export default function StatusToast({
  message,
  success,
  onClose,
}: StatusToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-md text-lg transition-all ${
          success
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${success ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-[#75879f] hover:text-[#75879f] cursor-pointer text-lg font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
