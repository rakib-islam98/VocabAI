const ReviewCompletedState = () => {
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
          Session Completed
        </h2>

        <p
          className="
            mt-4
            text-slate-500
          "
        >
          You already completed
          today's review session.
        </p>
      </div>
    </div>
  );
};

export default ReviewCompletedState;