const ReviewInsufficientState = ({
  message,
}) => {
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
            text-slate-900
          "
        >
          Keep Building Your Vocabulary
        </h2>

        <p
          className="
            mt-4
            text-slate-500
            max-w-md
            leading-7
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ReviewInsufficientState;