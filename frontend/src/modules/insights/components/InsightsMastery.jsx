const InsightsMastery = ({
  masteryDistribution,
}) => {
  const {
    weak = 0,
    learning = 0,
    strong = 0,
    mastered = 0,
  } = masteryDistribution || {};

  const total =
    weak +
    learning +
    strong +
    mastered;

  const getPercentage = (
    value
  ) => {
    if (!total) return 0;

    return Math.round(
      (value / total) * 100
    );
  };

  const rows = [
    {
      label: "Mastered",
      value: mastered,
      percentage:
        getPercentage(mastered),
      barClass:
        "bg-emerald-500",
    },

    {
      label: "Strong",
      value: strong,
      percentage:
        getPercentage(strong),
      barClass:
        "bg-blue-500",
    },

    {
      label: "Learning",
      value: learning,
      percentage:
        getPercentage(learning),
      barClass:
        "bg-amber-500",
    },

    {
      label: "Weak",
      value: weak,
      percentage:
        getPercentage(weak),
      barClass:
        "bg-red-500",
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Mastery Overview
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Understand how your
          vocabulary is distributed
          across different mastery
          levels.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {rows.map((row) => (
          <div key={row.label}>
            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >
              <span
                className="
                  font-medium
                  text-slate-700
                "
              >
                {row.label}
              </span>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {row.value} words
                </span>

                <span
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  {row.percentage}%
                </span>
              </div>
            </div>

            <div
              className="
                h-3
                overflow-hidden
                rounded-full
                bg-slate-100
              "
            >
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-500
                  ${row.barClass}
                `}
                style={{
                  width: `${row.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          mt-8
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
            leading-6
          "
        >
          Focus on moving words from
          Learning and Weak categories
          into Strong and Mastered
          through regular reviews.
        </p>
      </div>
    </div>
  );
};

export default InsightsMastery;