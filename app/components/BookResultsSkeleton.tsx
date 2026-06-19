export default function BookResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-44 bg-slate-100 rounded-md animate-pulse" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <div className="w-full aspect-2/3 bg-slate-100 rounded-md animate-pulse relative overflow-hidden" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-11/12 bg-slate-200 rounded-sm animate-pulse" />
              <div className="h-3 w-2/3 bg-slate-100 rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
