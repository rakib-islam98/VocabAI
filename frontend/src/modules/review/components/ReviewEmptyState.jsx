const ReviewEmptyState = () => {
  return (
    <div
      className="
        min-h-[70vh]
        flex items-center
        justify-center
      "
    >
      <div className="text-center">
        
        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Keep Building Your Vocabulary
        </h2>

        <p
          className="
            mt-4
            text-slate-500
          "
        >
          Add more vocabulary
          words to begin
          practicing.
        </p>
      </div>
    </div>
  );
};

export default ReviewEmptyState;