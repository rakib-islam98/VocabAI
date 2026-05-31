const ReviewCompletedToday = ({
  report,
  onViewReport,
}) => {
  return (
    <div
      className="
        min-h-[calc(100vh-140px)]
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          text-center
          shadow-sm
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
          ✓ Today's Review Completed
        </div>

        {/* SCORE */}

        <div className="mt-4">
          <div
            className="
              mx-auto
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              border-[5px]
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
              mt-2
              text-sm
              text-slate-500
            "
          >
            Accuracy Score
          </p>
        </div>

        {/* CONTENT */}

        <h1
          className="
            mt-4
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Review Completed
        </h1>

        <p
          className="
            mt-2
            text-slate-500
            leading-7
          "
        >
          You've already completed today's
          review session. You can revisit
          your mistakes and explanations
          anytime.
        </p>

        {/* STATS */}

        <div
          className="
            mt-5
            grid
            grid-cols-3
            gap-4
          "
        >
          <MiniStat
            label="Correct"
            value={
              report.correctCount
            }
            color="text-emerald-600"
          />

          <MiniStat
            label="Wrong"
            value={
              report.wrongCount
            }
            color="text-red-500"
          />

          <MiniStat
            label="Skipped"
            value={
              report.skippedCount
            }
            color="text-amber-500"
          />
        </div>

        {/* NOTICE */}

        <div
          className="
            mt-4
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            p-4
          "
        >
          <p
            className="
              text-sm
              text-slate-600
            "
          >
            Daily review completed successfully.
            Come back tomorrow for a new
            personalized session.
          </p>
        </div>

        {/* ACTION */}

        <div
          className="
            mt-5
            flex
            justify-center
          "
        >
          <button
            onClick={onViewReport}
            className="
              min-w-[220px]
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
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({
  label,
  value,
  color,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        text-center
      "
    >
      <p
        className="
          text-xs
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-1
          text-2xl
          font-bold
          ${color}
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default ReviewCompletedToday;