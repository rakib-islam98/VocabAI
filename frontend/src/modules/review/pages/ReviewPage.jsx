import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useReviewSession } from "../hooks/useReviewSession";

import ReviewLanding from "../components/ReviewLanding";

import ReviewEmptyState from "../components/ReviewEmptyState";

import ReviewCompletedState from "../components/ReviewCompletedState";

import ReviewSessionPlayer from "../components/ReviewSessionPlayer";

import ReviewInsufficientState from "../components/ReviewInsufficientState";

const loadingSteps = [
    "Analyzing your learning progress...",
    "Selecting vocabulary for practice...",
    "Generating contextual exercises...",
    "Balancing difficulty levels...",
    "Preparing your review session...",
];

const ReviewPage = () => {
  const [sessionData, setSessionData] = useState(null);

  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  /*
  =================================
  REVIEW SESSION MUTATION
  =================================
  */

  const { mutate, isPending } = useReviewSession();

  /*
  =================================
  STAGED LOADING EFFECT
  =================================
  */

  useEffect(() => {
    if (!isPending) {
      setLoadingStepIndex(0);

      return;
    }

    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => {
        return (prev + 1) % loadingSteps.length;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPending]);

  /*
  =================================
  GENERATE SESSION
  =================================
  */

  const handleGenerateSession = () => {
    mutate(undefined, {
      /*
        ============================
        SUCCESS
        ============================
        */

      onSuccess: (data) => {
        setSessionData(data.data);
      },

      /*
        ============================
        ERROR
        ============================
        */

      onError: (error) => {
        const message =
          error?.response?.data?.message || "Failed to generate review session";

        toast.error(message);
      },
    });
  };

  /*
  =================================
  AI GENERATION LOADING
  =================================
  */

  if (isPending) {
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
          {/* LOADER */}
          <div
            className="
              mx-auto
              h-12 w-12
              rounded-full
              border-4
              border-slate-200
              border-t-slate-900
              animate-spin
            "
          />

          {/* TITLE */}
          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Generating Review Session
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-3
              text-slate-500
              leading-7
              min-h-[28px]
              transition-all
            "
          >
            {loadingSteps[loadingStepIndex]}
          </p>
        </div>
      </div>
    );
  }

  /*
  =================================
  INITIAL LANDING
  =================================
  */

  if (!sessionData) {
    return (
      <ReviewLanding
        isPending={isPending}
        onGenerateSession={handleGenerateSession}
      />
    );
  }

  /*
  =================================
  EMPTY VOCABULARY
  =================================
  */

  if (sessionData.type === "empty") {
    return <ReviewEmptyState />;
  }

  /*
  =================================
  MINIMUM WORD REQUIREMENT
  =================================
  */

  if (sessionData.type === "insufficient_words") {
    return <ReviewInsufficientState message={sessionData.message} />;
  }

  /*
  =================================
  SESSION ALREADY COMPLETED
  =================================
  */

  if (sessionData.type === "completed_today") {
    return <ReviewCompletedState />;
  }

  /*
  =================================
  ACTIVE SESSION
  =================================
  */

  return <ReviewSessionPlayer sessionData={sessionData} />;
};

export default ReviewPage;
