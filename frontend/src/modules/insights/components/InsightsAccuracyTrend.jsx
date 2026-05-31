const InsightsAccuracyTrend = ({
  accuracyTrend,
}) => {
  const chartData =
    accuracyTrend?.map((item) => ({
      ...item,

      label: new Date(
        item.date
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    })) || [];

  const width = 500;
  const height = 220;

  const points =
    chartData.length > 1
      ? chartData.map(
          (item, index) => {
            const x =
              (index /
                (chartData.length - 1)) *
              (width - 40) +
              20;

            const y =
              height -
              (item.accuracy / 100) *
                (height - 40) -
              20;

            return `${x},${y}`;
          }
        )
      : [];

  const polylinePoints =
    points.join(" ");

  const latestAccuracy =
    chartData.length > 0
      ? chartData[
          chartData.length - 1
        ].accuracy
      : 0;

  const previousAccuracy =
    chartData.length > 1
      ? chartData[
          chartData.length - 2
        ].accuracy
      : latestAccuracy;

  const trend =
    latestAccuracy -
    previousAccuracy;

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
      {/* HEADER */}

      <div className="flex items-start justify-between">
        <div>
          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Accuracy Trend
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Monitor how your review
            accuracy evolves over time.
          </p>
        </div>

        {chartData.length > 1 && (
          <div
            className={`
              rounded-full
              px-3
              py-1
              text-sm
              font-medium
              ${
                trend >= 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }
            `}
          >
            {trend >= 0
              ? `+${trend}%`
              : `${trend}%`}
          </div>
        )}
      </div>

      {/* EMPTY */}

      {chartData.length === 0 && (
        <div
          className="
            flex
            h-[280px]
            items-center
            justify-center
          "
        >
          <p className="text-slate-500">
            Complete a few review sessions
            to unlock accuracy trends.
          </p>
        </div>
      )}

      {/* SINGLE POINT */}

      {chartData.length === 1 && (
        <div
          className="
            flex
            h-[280px]
            flex-col
            items-center
            justify-center
          "
        >
          <p
            className="
              text-6xl
              font-bold
              text-slate-900
            "
          >
            {latestAccuracy}%
          </p>

          <p className="mt-3 text-slate-500">
            Need more review history
            to display a trend.
          </p>
        </div>
      )}

      {/* CHART */}

      {chartData.length > 1 && (
        <>
          <div className="mt-8">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="
                h-[220px]
                w-full
              "
            >
              {/* GRID */}

              {[0, 25, 50, 75, 100].map(
                (level) => {
                  const y =
                    height -
                    (level / 100) *
                      (height - 40) -
                    20;

                  return (
                    <line
                      key={level}
                      x1="0"
                      x2={width}
                      y1={y}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                  );
                }
              )}

              {/* LINE */}

              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={
                  polylinePoints
                }
              />

              {/* POINTS */}

              {chartData.map(
                (item, index) => {
                  const x =
                    (index /
                      (chartData.length -
                        1)) *
                      (width - 40) +
                    20;

                  const y =
                    height -
                    (item.accuracy /
                      100) *
                      (height - 40) -
                    20;

                  return (
                    <circle
                      key={
                        item.date
                      }
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#2563eb"
                    />
                  );
                }
              )}
            </svg>
          </div>

          {/* FOOTER */}

          <div
            className="
              mt-4
              flex
              justify-between
              text-xs
              text-slate-500
            "
          >
            <span>
              {
                chartData[0]
                  ?.label
              }
            </span>

            <span>
              {
                chartData[
                  chartData.length -
                    1
                ]?.label
              }
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightsAccuracyTrend;