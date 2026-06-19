"use client";
import { ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PageLimitSelectorProps {
  currentLimit: number;
  baseUrl: string;
}
export default function PageLimitSelector({
  currentLimit,
  baseUrl,
}: PageLimitSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div>
      <label
        htmlFor="limit-select"
        className="text-xl font-bold text-[#f35c05] mr-2"
      >
        Show:
      </label>

      <select
        id="limit-select"
        value={currentLimit}
        onChange={handleLimitChange}
        className="p-2 bg-white border border-[#02698b]/30 text-lg font-medium text-[#3d4849] rounded-lg focus:outline-hidden focus:border-indigo-500 transition-colors cursor-pointer pr-8"
      >
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </select>
    </div>
  );
}
