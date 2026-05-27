import Button from "../../../components/ui/Button";

const ReviewNavigation = ({
  currentIndex,
  totalQuestions,
  canProceed,
  onNext,
  onPrevious,
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <Button
        className="min-w-[140px]"
        variant="secondary"
        onClick={onPrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </Button>

      <Button className="min-w-[140px]" disabled={!canProceed} onClick={onNext}>
        {isLastQuestion ? "Submit Session" : "Next"}
      </Button>
    </div>
  );
};

export default ReviewNavigation;
