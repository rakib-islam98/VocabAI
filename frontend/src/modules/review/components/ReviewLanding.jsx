import Button from "../../../components/ui/Button";

const ReviewLanding = ({
  isPending,
  onStartSession,

  vocabularyCount,

  weakWords,
  mediumWords,
  strongWords,

  estimatedQuestions,

  estimatedDuration,
}) => {
  return (
    <div
      className="
        min-h-[calc(100vh-110px)]
        flex
        items-center
        justify-center
        px-2
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          p-4
        "
      >
        {/* HEADER */}

        <div className="text-center">
          <div
            className="
              inline-flex
              items-center
              rounded-full
              bg-blue-50
              border
              border-blue-100
              px-4
              py-1
              text-sm
              font-medium
              text-blue-600
            "
          >
            AI Powered Practice
          </div>

          <h1
            className="
              mt-2
              text-4xl
              font-bold
              text-slate-900
            "
          >
            Today's Review Session
          </h1>

          <p
            className="
              mt-3
              text-slate-500
              leading-7
            "
          >
            Personalized vocabulary review
            generated from your learning
            progress and mastery scores.
          </p>
        </div>

        {/* VOCABULARY COUNT */}

        <div
          className="
            mt-4
            text-center
          "
        >
          <p
            className="
              text-5xl
              font-bold
              text-slate-900
            "
          >
            {vocabularyCount}
          </p>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Words Available
          </p>
        </div>

        {/* MASTERY BREAKDOWN */}

        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-4
          "
        >
          <MasteryCard
            value={weakWords}
            label="Weak"
            valueClass="text-red-500"
          />

          <MasteryCard
            value={mediumWords}
            label="Medium"
            valueClass="text-amber-500"
          />

          <MasteryCard
            value={strongWords}
            label="Strong"
            valueClass="text-emerald-500"
          />
        </div>

        {/* SESSION INFO */}

        <div
          className="
            mt-2
            grid
            grid-cols-3
            gap-4
          "
        >
          <InfoCard
            value={
              estimatedQuestions
            }
            label="Questions"
          />

          <InfoCard
            value={`~${estimatedDuration}`}
            label="Minutes"
          />

          <InfoCard
            value="AI"
            label="Generated"
          />
        </div>

        {/* NOTICE */}

        <div
          className="
            mt-2
            rounded-2xl
            bg-blue-50
            border
            border-blue-100
            p-4
          "
        >
          <p
            className="
              text-center
              text-sm
              text-slate-600
            "
          >
            One review session is available
            each day.
          </p>
        </div>

        {/* CTA */}

        <div
          className="
            mt-2
            flex
            justify-center
          "
        >
          <Button
            onClick={onStartSession}
            disabled={isPending}
            className="
              min-w-[260px]
              px-8
              py-4
              text-lg
            "
          >
            {isPending
              ? "Generating Session..."
              : "Start Review Session"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const MasteryCard = ({
  value,
  label,
  valueClass,
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
        className={`
          text-2xl
          font-bold
          ${valueClass}
        `}
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

const InfoCard = ({
  value,
  label,
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

export default ReviewLanding;