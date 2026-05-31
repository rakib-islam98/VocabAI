const ReviewResumeSession = ({
  hasSavedProgress,
  session,
  onContinue,
}) => {
  let answeredCount = 0;

  if (
    hasSavedProgress &&
    session?.id
  ) {
    try {
      const savedAnswers =
        JSON.parse(
          sessionStorage.getItem(
            `review_answers_${session.id}`
          ) || "{}"
        );

      answeredCount =
        Object.keys(
          savedAnswers
        ).length;
    } catch {
      answeredCount = 0;
    }
  }

  const totalQuestions =
    session?.exercises?.length ||
    0;

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
          p-8
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
            border-blue-100
            bg-blue-50
            px-4
            py-1
            text-sm
            font-medium
            text-blue-600
          "
        >
          Active Review Session
        </div>

        {/* TITLE */}

        <h1
          className="
            mt-5
            text-4xl
            font-bold
            text-slate-900
          "
        >
          {hasSavedProgress
            ? "Resume Review Session"
            : "Continue Review Session"}
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            text-slate-500
            leading-7
          "
        >
          {hasSavedProgress
            ? "Your previous progress was found. Continue where you left off."
            : "An unfinished review session already exists. Browser progress could not be found, but you can continue the session from the beginning."}
        </p>

        {/* PROGRESS */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-6
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Progress
          </p>

          <p
            className="
              mt-2
              text-4xl
              font-bold
              text-slate-900
            "
          >
            {answeredCount} /{" "}
            {totalQuestions}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Questions answered
          </p>
        </div>

        {/* NOTICE */}

        <div
          className="
            mt-6
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
            Resume your existing review session and continue your progress.
          </p>
        </div>

        {/* ACTION */}

        <div
          className="
            mt-8
            flex
            justify-center
          "
        >
          <button
            onClick={onContinue}
            className="
              min-w-[240px]
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
            {hasSavedProgress
              ? "Resume Session"
              : "Continue Session"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewResumeSession;