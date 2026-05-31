const ReviewProgress = ({
  current,
  total,
}) => {
  const progress =
    (current / total) * 100;

  return (
    <div className="mb-4">
      
      <div className="flex items-center justify-between mb-2">
        
        <p className="text-sm font-medium text-slate-600">
          Question {current} of {total}
        </p>

        <p className="text-sm text-slate-500">
          {Math.round(progress)}%
        </p>
      </div>

      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ReviewProgress;