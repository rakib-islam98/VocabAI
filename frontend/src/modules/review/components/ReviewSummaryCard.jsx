const ReviewSummaryCard = ({
  report,
}) => {
  const getFeedbackMessage = () => {
    if (report.score >= 85) {
      return "Strong overall retention. Review the missed words below carefully.";
    }

    if (report.score >= 60) {
      return "Good progress. Focus on the incorrect answers to strengthen retention.";
    }

    return "Several words need reinforcement. Carefully review the explanations below.";
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* STATUS */}

        <div
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-emerald-100
            bg-emerald-50
            px-4
            py-1
            text-sm
            font-medium
            text-emerald-600
          "
        >
          ✓ Session Submitted
        </div>

        {/* SCORE */}

        <div
          className="
            mt-6
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            border-[6px]
            border-emerald-500
          "
        >
          <span
            className="
              text-4xl
              font-bold
              text-slate-900
            "
          >
            {report.score}%
          </span>
        </div>

        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >
          Accuracy Score
        </p>

        {/* TITLE */}

        <h2
          className="
            mt-5
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Session Results
        </h2>

        {/* FEEDBACK */}

        <p
          className="
            mt-3
            max-w-2xl
            text-slate-500
            leading-7
          "
        >
          {getFeedbackMessage()}
        </p>
      </div>

      {/* STATS */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-4
        "
      >
        <StatCard
          label="Correct"
          value={report.correctCount}
          valueColor="text-emerald-600"
        />

        <StatCard
          label="Wrong"
          value={report.wrongCount}
          valueColor="text-red-500"
        />

        <StatCard
          label="Skipped"
          value={report.skippedCount}
          valueColor="text-amber-500"
        />

        <StatCard
          label="Total"
          value={report.totalQuestions}
          valueColor="text-blue-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  valueColor,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-5
        text-center
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-2
          text-3xl
          font-bold
          ${valueColor}
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default ReviewSummaryCard;