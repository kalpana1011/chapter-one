import BookResultsSkeleton from "../components/BookResultsSkeleton";

export default function ReadingListLoading() {
  return (
    <div className="w-full">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <div className="h-7 bg-stone-200 rounded-xs w-1/4 mb-2 animate-pulse" />
        <div className="h-3 bg-stone-200 rounded-xs w-1/3 animate-pulse" />
      </div>
      <BookResultsSkeleton />
    </div>
  );
}
