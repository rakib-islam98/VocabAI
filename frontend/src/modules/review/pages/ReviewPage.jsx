import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useReviewStatus } from "../hooks/useReviewStatus";

import { useCreateReviewSession } from "../hooks/useCreateReviewSession";

import ReviewLanding from "../components/ReviewLanding";

import ReviewEmptyState from "../components/ReviewEmptyState";

import ReviewSessionPlayer from "../components/ReviewSessionPlayer";

import ReviewInsufficientState from "../components/ReviewInsufficientState";

import ReviewResults from "../components/ReviewResults";

import ReviewCompletedToday from "../components/ReviewCompletedToday";

import ReviewResumeSession from "../components/ReviewResumeSession";

const loadingSteps = [
  "Analyzing your learning progress...",
  "Selecting vocabulary for practice...",
  "Generating contextual exercises...",
  "Balancing difficulty levels...",
  "Preparing your review session...",
];

const ReviewPage = () => {
  /*
  =================================
  LOCAL STATE
  =================================
  */

  const [sessionData, setSessionData] = useState(null);

  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const [reviewReport, setReviewReport] = useState(null);

  const [showCompletedReport, setShowCompletedReport] = useState(false);

  const [startActiveSession, setStartActiveSession] = useState(false);

  /*
  =================================
  REVIEW STATUS QUERY
  =================================
  */

  const { data, isLoading } = useReviewStatus();

  /*
  =================================
  CREATE SESSION MUTATION
  =================================
  */

  const { mutate: createSession, isPending } = useCreateReviewSession();

  /*
  =================================
  SYNC QUERY DATA
  =================================
  */

  useEffect(() => {
    if (!data?.data) {
      return;
    }

    setSessionData((current) => {
      if (current?.type === "new") {
        return current;
      }

      return data.data;
    });
  }, [data]);

  /*
  =================================
  SAVED SESSION DETECTION
  =================================
  */

  const hasSavedProgress = (() => {
    if (!sessionData?.session?.id) {
      return false;
    }

    try {
      const savedAnswers = JSON.parse(
        sessionStorage.getItem(`review_answers_${sessionData.session.id}`) ||
          "{}",
      );

      return Object.keys(savedAnswers).length > 0;
    } catch {
      return false;
    }
  })();

  /*
  =================================
  AI GENERATION LOADING ANIMATION
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
  CREATE NEW SESSION
  =================================
  */

  const handleStartSession = () => {
    createSession(undefined, {
      onSuccess: (response) => {
        setSessionData(response.data);
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to create review session",
        );
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
            p-8
            text-center
            w-full
            max-w-sm
            mx-4
          "
        >
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

          <p
            className="
              mt-3
              text-slate-500
              leading-7
              min-h-[28px]
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
  INITIAL STATUS LOADING
  =================================
  */

  if (isLoading) {
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
            text-center
          "
        >
          <div
            className="
              mx-auto
              h-10 w-10
              rounded-full
              border-4
              border-slate-200
              border-t-slate-900
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-slate-500
            "
          >
            Loading review...
          </p>
        </div>
      </div>
    );
  }

  /*
  =================================
  REVIEW RESULTS
  =================================
  */

  if (reviewReport) {
    return <ReviewResults report={reviewReport} />;
  }

  /*
  =================================
  SAFETY GUARD
  =================================
  */

  if (!sessionData) {
    return null;
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
  INSUFFICIENT WORDS
  =================================
  */

  if (sessionData.type === "insufficient_words") {
    return <ReviewInsufficientState message={sessionData.message} />;
  }

  /*
  =================================
  READY TO GENERATE
  =================================
  */

  if (sessionData.type === "ready_to_generate") {
    return (
      <ReviewLanding
        isPending={isPending}
        onStartSession={handleStartSession}
        vocabularyCount={sessionData.vocabularyCount}
        weakWords={sessionData.weakWords}
        mediumWords={sessionData.mediumWords}
        strongWords={sessionData.strongWords}
        estimatedQuestions={sessionData.estimatedQuestions}
        estimatedDuration={sessionData.estimatedDuration}
      />
    );
  }

  /*
  =================================
  ACTIVE SESSION
  =================================
  */

  if (sessionData.type === "active") {
    if (startActiveSession) {
      return (
        <ReviewSessionPlayer
          sessionData={sessionData}
          onSessionCompleted={setReviewReport}
        />
      );
    }

    return (
      <ReviewResumeSession
        hasSavedProgress={hasSavedProgress}
        session={sessionData.session}
        onContinue={() => setStartActiveSession(true)}
      />
    );
  }

  /*
  =================================
  COMPLETED TODAY
  =================================
  */

  if (sessionData.type === "completed_today") {
    if (showCompletedReport) {
      return <ReviewResults report={sessionData.report} />;
    }

    return (
      <ReviewCompletedToday
        report={sessionData.report}
        onViewReport={() => setShowCompletedReport(true)}
      />
    );
  }

  /*
  =================================
  NEW SESSION
  =================================
  */

  if (sessionData.type === "new") {
    return (
      <ReviewSessionPlayer
        sessionData={sessionData}
        onSessionCompleted={setReviewReport}
      />
    );
  }

  /*
  =================================
  FALLBACK
  =================================
  */

  return null;
};

export default ReviewPage;
