import { Calendar, Flame, Target } from "lucide-react";

const InsightsActivity = ({ activity }) => {
  const {
    activeDays = 0,
    goalDays = 0,
    currentStreak = 0,
    bestStreak = 0,
    heatmap = [],
  } = activity || {};

  const heatmapMap = new Map(heatmap.map((day) => [day.date, day.level]));

  const today = new Date();

  const days = [];

  for (let i = 139; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    days.push({
      date: dateString,

      level: heatmapMap.get(dateString) || 0,
    });
  }

  const getIntensity = (level) => {
    switch (level) {
      case 1:
        return "bg-emerald-200"; // vocabulary only

      case 2:
        return "bg-emerald-400"; // review only

      case 3:
        return "bg-emerald-700"; // both

      default:
        return "bg-slate-200";
    }
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
      {/* HEADER */}

      <div>
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Learning Activity
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Track your daily review consistency and learning habits.
        </p>
      </div>

      <div
        className="
          mt-8
          grid
          gap-6
          lg:grid-cols-[1fr_360px]
        "
      >
        {/* LEFT SIDE */}

        <div
          className="
              flex
              flex-col
              justify-center
            "
        >
          <div className="overflow-x-auto">
            <div
              className="
                grid
                min-w-max
                grid-flow-col
                grid-rows-7
                gap-1
              "
            >
              {days.map((day) => (
                <div
                  key={day.date}
                  title={day.date}
                  className={`
                    h-4
                    w-4
                    rounded-[4px]
                    transition-all
                    hover:scale-125
                    cursor-pointer
                    ${getIntensity(day.level)}
                  `}
                />
              ))}
            </div>
          </div>

          {/* LEGEND */}

          <div
            className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-slate-500
              "
          >
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-emerald-200" />
                <span>Added Words</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-emerald-400" />
                <span>Review</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-emerald-700" />
                <span>Both</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-2
          "
        >
          <StatCard
            icon={<Calendar size={18} className="text-blue-600" />}
            value={activeDays}
            label="Active Days"
          />

          <StatCard
            icon={<Target size={18} className="text-emerald-600" />}
            value={goalDays}
            label="Goal Days"
          />

          <StatCard
            icon={<Flame size={18} className="text-orange-500" />}
            value={currentStreak > 0 ? `${currentStreak} Days` : "Start Today"}
            label="Current Streak"
          />

          <StatCard
            icon={<Flame size={18} className="text-red-500" />}
            value={`${bestStreak} Days`}
            label="Best Streak"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
      "
    >
      <div className="flex items-center">{icon}</div>

      <p
        className="
          mt-3
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>
    </div>
  );
};

export default InsightsActivity;
