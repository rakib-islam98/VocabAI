import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import ReviewProgress from "./ReviewProgress";
import ReviewQuestionCard from "./ReviewQuestionCard";

import ConfirmDialog from "../../../components/common/ConfirmDialog";

import { useSubmitReview } from "../hooks/useSubmitReview";

import { useSaveReviewAnswers } from "../hooks/useSaveReviewAnswers";

const ReviewSessionPlayer = ({ sessionData, onSessionCompleted }) => {
  const questions = sessionData?.session?.exercises || [];

  const sessionId = sessionData?.session?.id;

  const [isSubmittingSession, setIsSubmittingSession] = useState(false);

  /*
  =================================
  SUBMIT MUTATION
  =================================
  */

  const { mutateAsync: submitSession, isPending: isSubmitting } =
    useSubmitReview();

  /*
  =================================
  SAVE ANSWERS MUTATION
  =================================
  */

  const { mutateAsync: saveAnswers } = useSaveReviewAnswers();

  /*
  =================================
  SUBMIT CONFIRMATION
  =================================
  */

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  /*
  =================================
  RESTORE CURRENT INDEX
  =================================
  */

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem(
      `review_current_index_${sessionId}`,
    );

    return savedIndex ? Number(savedIndex) : 0;
  });

  /*
  =================================
  RESTORE ANSWERS
  =================================
  */

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = sessionStorage.getItem(`review_answers_${sessionId}`);

    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  /*
  =================================
  SAVE ANSWERS TO SESSION STORAGE
  =================================
  */

  useEffect(() => {
    sessionStorage.setItem(
      `review_answers_${sessionId}`,
      JSON.stringify(answers),
    );
  }, [answers, sessionId]);

  /*
  =================================
  SAVE CURRENT INDEX
  =================================
  */

  useEffect(() => {
    sessionStorage.setItem(`review_current_index_${sessionId}`, currentIndex);
  }, [currentIndex, sessionId]);

  /*
  =================================
  COMPLETION SCREEN
  =================================
  */

  /*
  =================================
  CURRENT QUESTION
  =================================
  */

  const currentQuestion = questions[currentIndex];

  /*
  =================================
  SAFETY GUARD
  =================================
  */

  if (!currentQuestion) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">No active question found.</p>
      </div>
    );
  }

  /*
  =================================
  RESTORE SELECTED ANSWER
  =================================
  */

  const selectedAnswer = answers[currentQuestion.id]?.selectedAnswer ?? null;
  /*
  =================================
  ANSWER STATS
  =================================
  */

  const answeredCount = Object.keys(answers).length;

  const unansweredCount = questions.length - answeredCount;

  /*
  =================================
  ANSWER SELECTION
  =================================
  */

  const handleSelectAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedAnswer: answer,
      },
    }));
  };

  /*
  =================================
  NEXT QUESTION
  =================================
  */

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSubmitDialog(true);
    }
  };

  /*
  =================================
  PREVIOUS QUESTION
  =================================
  */

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  /*
  =================================
  FINAL SUBMIT
  =================================
  */

  const handleSubmitSession = async () => {
    if (isSubmittingSession) return;

    setIsSubmittingSession(true);
    try {
      /*
        ============================
        PATCH ANSWERS ONCE
        ============================
        */

      await saveAnswers({
        sessionId,
        answers,
      });

      /*
        ============================
        FINAL SUBMIT
        ============================
        */

      const response = await submitSession({
        sessionId,
      });

      /*
        ============================
        CLEANUP
        ============================
        */

      sessionStorage.removeItem(`review_answers_${sessionId}`);

      sessionStorage.removeItem(`review_current_index_${sessionId}`);

      /*
        ============================
        SUCCESS UI
        ============================
        */

      toast.success("Session submitted successfully");

      setShowSubmitDialog(false);

      onSessionCompleted(response.data.report);
      setIsSubmittingSession(false);
    } catch (error) {
      toast.error("Failed to submit session");
      setIsSubmittingSession(false);
    }
  };

  return (
    <div
      className="
    h-[calc(100vh-80px)]
    flex
    items-center
    justify-center
    px-4
  "
    >
      <div className="max-w-3xl mx-auto">
        {/* PROGRESS */}
        <ReviewProgress current={currentIndex + 1} total={questions.length} />

        {/* QUESTION */}
        <ReviewQuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        {/* SUBMIT CONFIRMATION */}
        <ConfirmDialog
          isOpen={showSubmitDialog}
          title="Submit Session?"
          description={`You answered ${answeredCount} of ${questions.length} questions. ${
            unansweredCount > 0
              ? "Unanswered questions will be marked incorrect."
              : ""
          }`}
          confirmText="Submit Session"
          cancelText="Go Back"
          isLoading={isSubmittingSession}
          onCancel={() => setShowSubmitDialog(false)}
          onConfirm={handleSubmitSession}
        />
      </div>
    </div>
  );
};

export default ReviewSessionPlayer;
