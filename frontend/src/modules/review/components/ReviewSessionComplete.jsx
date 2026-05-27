import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";

const ReviewSessionComplete = () => {
  const navigate = useNavigate();

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
            bg-white border
            rounded-3xl
            shadow-sm
            p-10
            text-center
            max-w-xl w-full
          "
      >
        <h1
          className="
              text-4xl
              font-bold
              text-slate-900
            "
        >
          Session Completed
        </h1>

        <p
          className="
              mt-4
              text-slate-500
              leading-7
            "
        >
          Your review session has been submitted successfully.
        </p>

        <Button className="mt-8" onClick={() => navigate("/vocabulary")}>
          Back to Vocabulary
        </Button>
      </div>
    </div>
  );
};

export default ReviewSessionComplete;
