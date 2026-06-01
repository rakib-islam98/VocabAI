import {
  Award,
  BookOpen,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";

const InsightsHero = ({ hero }) => {
  const {
    learningScore = 0,
    accuracy = 0,
    totalWords = 0,
    strongWords = 0,
    currentStreak = 0,
    reviewsCompleted = 0,
  } = hero || {};

  const getScoreMessage = () => {
    if (learningScore >= 80) {
      return "Excellent vocabulary retention and learning consistency.";
    }

    if (learningScore >= 60) {
      return "Your vocabulary foundation is improving steadily.";
    }

    if (learningScore >= 40) {
      return "Keep practicing consistently to strengthen retention.";
    }

    return "You're just getting started. Consistency will build momentum.";
  };

  const getScoreLevel = () => {
    if (learningScore >= 80) {
      return {
        label: "Excellent",
        color:
          "bg-emerald-50 text-emerald-700",
      };
    }

    if (learningScore >= 60) {
      return {
        label: "Strong Progress",
        color:
          "bg-blue-50 text-blue-700",
      };
    }

    if (learningScore >= 40) {
      return {
        label: "Needs Improvement",
        color:
          "bg-amber-50 text-amber-700",
      };
    }

    return {
      label: "Getting Started",
      color:
        "bg-slate-100 text-slate-700",
    };
  };

  const scoreLevel =
    getScoreLevel();

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
      {/* TOP */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Award
              size={18}
              className="text-indigo-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-indigo-600
              "
            >
              Learning Score
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h2
              className="
                text-5xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {learningScore}
              <span
                className="
                  text-2xl
                  font-medium
                  text-slate-400
                "
              >
                /100
              </span>
            </h2>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
                ${scoreLevel.color}
              `}
            >
              {scoreLevel.label}
            </span>
          </div>

          <p
            className="
              mt-3
              max-w-2xl
              text-slate-500
              leading-7
            "
          >
            {getScoreMessage()}
          </p>
        </div>
      </div>

      {/* METRICS */}

      <div
        className="
          mt-8
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-5
        "
      >
        <MiniMetric
          icon={
            <Target
              size={18}
              className="text-emerald-600"
            />
          }
          value={`${accuracy}%`}
          label="Accuracy"
        />

        <MiniMetric
          icon={
            <TrendingUp
              size={18}
              className="text-blue-600"
            />
          }
          value={strongWords}
          label="Strong Words"
        />

        <MiniMetric
          icon={
            <Flame
              size={18}
              className="text-orange-600"
            />
          }
          value={
            currentStreak > 0
              ? `${currentStreak} Days`
              : "Start Today"
          }
          label="Current Streak"
        />

        <MiniMetric
          icon={
            <BookOpen
              size={18}
              className="text-purple-600"
            />
          }
          value={totalWords}
          label="Vocabulary"
        />

        <MiniMetric
          icon={
            <Award
              size={18}
              className="text-rose-600"
            />
          }
          value={reviewsCompleted}
          label="Reviews"
        />
      </div>
    </div>
  );
};

const MiniMetric = ({
  icon,
  value,
  label,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {icon}

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </p>
    </div>
  );
};

export default InsightsHero;