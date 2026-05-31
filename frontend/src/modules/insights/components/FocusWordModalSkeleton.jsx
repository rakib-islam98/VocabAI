import Skeleton from "../../../components/ui/Skeleton";

const FocusWordModalSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-3xl" />

      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />

        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-5/6" />

        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export default FocusWordModalSkeleton;