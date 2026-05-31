import { useNavigate } from "react-router-dom";

import ReviewSummaryCard from "./ReviewSummaryCard";
import MistakeReviewCard from "./MistakeReviewCard";

const ReviewResults = ({ report }) => {
  const navigate = useNavigate();

  /*
  ================================
  FILTER INCORRECT RESULTS
  ================================
  */

  const mistakes =
    report.results.filter(
      (result) => !result.wasCorrect
    );

  /*
  ================================
  PERFECT SESSION
  ================================
  */

  const isPerfectSession =
    mistakes.length === 0;

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        px-4
        py-8
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
          space-y-8
        "
      >
        {/* SUMMARY */}

        <ReviewSummaryCard
          report={report}
        />

        {/* PERFECT SESSION */}

        {isPerfectSession ? (
          <div
            className="
              rounded-3xl
              border
              border-emerald-200
              bg-emerald-50
              p-10
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-emerald-700
              "
            >
              Perfect Session
            </h2>

            <p
              className="
                mt-3
                text-slate-600
              "
            >
              All answers were correct.
              Strong retention across
              this session.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}

            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                Review Mistakes
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Focus on the missed
                vocabulary below and
                review the explanations.
              </p>
            </div>

            {/* MISTAKES */}

            <div
              className="
                space-y-4
              "
            >
              {mistakes.map(
                (result) => (
                  <MistakeReviewCard
                    key={
                      result.exerciseId
                    }
                    result={result}
                  />
                )
              )}
            </div>
          </>
        )}

        {/* ACTION */}

        <div
          className="
            flex
            justify-center
            pt-4
          "
        >
          <button
            onClick={() =>
              navigate(
                "/vocabulary"
              )
            }
            className="
              rounded-xl
              bg-slate-900
              px-8
              py-3
              font-medium
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Back to Vocabulary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewResults;