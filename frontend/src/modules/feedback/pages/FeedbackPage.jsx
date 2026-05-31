import Container from "../../../components/ui/Container";

import FeedbackForm from "../components/FeedbackForm";

const FeedbackPage = () => {
  return (
    <Container>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Feedback
        </h1>

        <p
          className="
            mt-1
            text-slate-500
          "
        >
          Help improve VocabAI by sharing ideas, reporting bugs, asking
          questions, or suggesting new features.
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        <FeedbackForm />
      </div>
    </Container>
  );
};

export default FeedbackPage;
