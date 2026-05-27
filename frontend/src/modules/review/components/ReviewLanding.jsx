import Button from "../../../components/ui/Button";

const ReviewLanding = ({
  isPending,
  onGenerateSession,
}) => {
  return (
    <div
      className="
        min-h-[70vh]
        flex items-center
        justify-center
      "
    >
      <div
        className="
          w-full max-w-2xl
          bg-white border
          rounded-3xl
          shadow-sm
          p-10
          text-center
        "
      >
        <h1
          className="
            text-5xl
            font-bold
            text-slate-900
          "
        >
          Daily Practice
        </h1>

        <p
          className="
            mt-5
            text-slate-500
            leading-7
            text-lg
          "
        >
          Practice your saved
          vocabulary through
          adaptive review sessions
          designed around your
          learning progress.
        </p>

        <Button
          onClick={
            onGenerateSession
          }
          disabled={isPending}
          className="
            mt-10
            px-8 py-4
            text-lg
          "
        >
          {isPending
            ? "Preparing Session..."
            : "Start Now"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewLanding;