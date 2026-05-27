import ReviewOptionButton from "./ReviewOptionButton";

const getExerciseLabel = (type) => {
  switch (type) {
    case "usage_mcq":
      return "Usage Question";

    case "fill_blank":
      return "Fill in the Blank";

    case "reverse_meaning":
      return "Meaning Question";

    default:
      return "Vocabulary Exercise";
  }
};

const ReviewQuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,

  currentIndex,
  totalQuestions,

  onNext,
  onPrevious,
}) => {
  return (
    <div
      className="
        w-full
        max-w-2xl
        mx-auto

        bg-white
        border
        rounded-3xl
        shadow-sm

        p-5

        flex
        flex-col
      "
    >
      {/* HEADER */}
      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          {getExerciseLabel(
            question.type
          )}
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            Question{" "}
            {currentIndex + 1} of{" "}
            {totalQuestions}
          </p>
        </div>
      </div>

      {/* QUESTION */}
      <div className="mt-5">
        <p
          className="
            text-2xl
            font-semibold
            text-slate-900
            leading-relaxed
          "
        >
          {question.question}
        </p>
      </div>

      {/* OPTIONS */}
      <div className="mt-5 space-y-3">
        {(question.options || []).map(
          (option) => (
            <ReviewOptionButton
              key={option}
              option={option}
              isSelected={
                selectedAnswer ===
                option
              }
              onSelect={() =>
                onSelectAnswer(option)
              }
            />
          )
        )}
      </div>

      {/* NAVIGATION */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="
            flex-1
            rounded-2xl
            border
            py-3
            font-semibold
            transition

            disabled:opacity-50
            disabled:cursor-not-allowed

            hover:bg-slate-50
          "
        >
          Previous
        </button>

        <button
          onClick={onNext}
          className="
            flex-1
            rounded-2xl
            bg-slate-900
            text-white
            py-3
            font-semibold
            transition

            hover:bg-slate-800
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewQuestionCard;