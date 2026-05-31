import { BookOpen } from "lucide-react";

const InsightsVocabularyGrowth = ({
  vocabularyGrowth,
}) => {
  const chartData =
    vocabularyGrowth?.map((item) => ({
      ...item,

      label: new Date(
        `${item.month}-01`
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
    })) || [];

  const maxCount = Math.max(
    ...chartData.map(
      (item) => item.count
    ),
    1
  );

  const latestCount =
    chartData.length > 0
      ? chartData[
          chartData.length - 1
        ].count
      : 0;

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
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <BookOpen
              size={18}
              className="text-blue-600"
            />

            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Vocabulary Growth
            </h2>
          </div>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Track how your vocabulary
            collection grows over time.
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-sm
            font-medium
            text-blue-700
          "
        >
          {latestCount} words
        </div>
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
            Add vocabulary words to
            start tracking growth.
          </p>
        </div>
      )}

      {/* CONTENT */}

      {chartData.length > 0 && (
        <div
          className="
            mt-8
            space-y-5
          "
        >
          {chartData.map((item) => {
            const width =
              (item.count /
                maxCount) *
              100;

            return (
              <div
                key={item.month}
              >
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {item.label}
                  </span>

                  <span
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    {item.count} words
                  </span>
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
                    className="
                      h-full
                      rounded-full
                      bg-blue-500
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InsightsVocabularyGrowth;