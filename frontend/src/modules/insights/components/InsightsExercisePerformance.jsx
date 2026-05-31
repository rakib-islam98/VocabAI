import { Brain } from "lucide-react";

const InsightsExercisePerformance = ({
  exercisePerformance,
}) => {
  const performance =
    exercisePerformance || [];

  const formatLabel = (
    exerciseType
  ) => {
    return exerciseType
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

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
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Brain
          size={18}
          className="text-violet-600"
        />

        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Exercise Performance
        </h2>
      </div>

      <p
        className="
          mt-1
          text-sm
          text-slate-500
        "
      >
        Compare performance across
        different exercise formats.
      </p>

      {performance.length === 0 ? (
        <div
          className="
            flex
            h-48
            items-center
            justify-center
          "
        >
          <p className="text-slate-500">
            Complete reviews to see
            exercise insights.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {performance.map((item) => (
            <div
              key={item.type}
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-2
                "
              >
                <div>
                  <p
                    className="
                      font-medium
                      text-slate-900
                    "
                  >
                    {formatLabel(
                      item.type
                    )}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {
                      item.attempts
                    }{" "}
                    attempts
                  </p>
                </div>

                <p
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    item.accuracy
                  }
                  %
                </p>
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
                    bg-violet-500
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${item.accuracy}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightsExercisePerformance;