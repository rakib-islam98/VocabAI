import { useState } from "react";

const MistakeReviewCard = ({
  result,
}) => {
  const [expanded, setExpanded] =
    useState(false);

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}

      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="
          w-full
          p-5
          text-left
          transition
          hover:bg-slate-50
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-sm
                font-medium
                text-red-500
              "
            >
              Incorrect Answer
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-semibold
                text-slate-900
              "
            >
              {result.word}
            </h3>
          </div>

          <div
            className="
              text-sm
              text-slate-500
            "
          >
            {expanded
              ? "Hide"
              : "Review"}
          </div>
        </div>
      </button>

      {/* EXPANDED CONTENT */}

      {expanded && (
        <div
          className="
            border-t
            border-slate-200
            bg-slate-50
            p-5
            space-y-5
          "
        >
          {/* QUESTION */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Question
            </p>

            <p
              className="
                mt-2
                text-slate-700
                leading-relaxed
              "
            >
              {result.question}
            </p>
          </div>

          {/* USER ANSWER */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Your Answer
            </p>

            <div
              className="
                mt-2
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-red-700
              "
            >
              {result.wasSkipped
                ? "Skipped"
                : result.selectedAnswer}
            </div>
          </div>

          {/* CORRECT ANSWER */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Correct Answer
            </p>

            <div
              className="
                mt-2
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-3
                text-emerald-700
              "
            >
              {result.correctAnswer}
            </div>
          </div>

          {/* EXPLANATION */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Explanation
            </p>

            <div
              className="
                mt-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-4
                text-slate-700
                leading-relaxed
              "
            >
              {result.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MistakeReviewCard;