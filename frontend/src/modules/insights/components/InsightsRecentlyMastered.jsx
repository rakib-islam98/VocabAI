import { Trophy } from "lucide-react";

const InsightsRecentlyMastered = ({
  recentlyMasteredWords,
}) => {
  const words =
    recentlyMasteredWords || [];

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
        <Trophy
          size={18}
          className="text-amber-500"
        />

        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Recently Mastered
        </h2>
      </div>

      <p
        className="
          mt-1
          text-sm
          text-slate-500
        "
      >
        Words you've successfully
        moved into the mastered
        category.
      </p>

      {words.length === 0 ? (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-amber-100
            bg-amber-50
            p-6
            text-center
          "
        >
          <p
            className="
              font-medium
              text-slate-900
            "
          >
            No mastered words yet
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
              leading-6
            "
          >
            Keep reviewing consistently.
            Your first mastered words
            will appear here as your
            mastery scores improve.
          </p>
        </div>
      ) : (
        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {words.map((word) => (
            <div
              key={word.word}
              className="
                rounded-2xl
                border
                border-emerald-200
                bg-emerald-50
                p-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <h3
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  {word.word}
                </h3>

                <span
                  className="
                    rounded-full
                    bg-emerald-100
                    px-2
                    py-1
                    text-xs
                    font-medium
                    text-emerald-700
                  "
                >
                  Mastered
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  text-slate-600
                "
              >
                Mastery Score
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-emerald-600
                "
              >
                {word.masteryScore}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightsRecentlyMastered;