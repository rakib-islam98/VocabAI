import Skeleton from "../../../components/ui/Skeleton";

const VocabularyCardSkeleton = () => {
  return (
    <div className="rounded-3xl border p-6">
      <div className="flex gap-4">
        <Skeleton className="h-28 w-40 rounded-2xl" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

export default VocabularyCardSkeleton;