import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import FeedbackCategorySelector from "./FeedbackCategorySelector";

import { FEEDBACK_CATEGORIES } from "../constants/feedbackCategories";

import { submitFeedback } from "../services/feedback.service";

import useAuthStore from "../../../store/authStore";

const MAX_MESSAGE_LENGTH = 1000;
const FEEDBACK_COOLDOWN = 60 * 1000; // 1 minute

const FeedbackForm = () => {
  const { user } = useAuthStore();

  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Important");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      return toast.error("Please select a category");
    }

    if (!message.trim()) {
      return toast.error("Please enter your feedback");
    }

    const lastFeedbackTime = localStorage.getItem("last_feedback_time");

    if (
      lastFeedbackTime &&
      Date.now() - Number(lastFeedbackTime) < FEEDBACK_COOLDOWN
    ) {
      const secondsRemaining = Math.ceil(
        (FEEDBACK_COOLDOWN - (Date.now() - Number(lastFeedbackTime))) / 1000,
      );

      return toast.error(
        `Please wait ${secondsRemaining}s before sending another feedback.`,
      );
    }

    try {
      setIsSubmitting(true);

      await submitFeedback({
        category,
        subject,
        message,
        email,
        userName: user?.name,
        userId: user?.id,
        submittedAt: new Date().toISOString(),
      });

      localStorage.setItem(
        "last_feedback_time",
        Date.now().toString()
      );
      toast.success("Feedback submitted successfully");

      setCategory("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error?.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-2xl
        mx-auto
        rounded-3xl
        border
        bg-white
        p-4
        shadow-sm
        space-y-2
      "
    >
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>

        <FeedbackCategorySelector
          value={category}
          onChange={setCategory}
          categories={FEEDBACK_CATEGORIES}
        />
      </div>

      <Input
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Brief summary"
      />

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>

        <textarea
          rows={4}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))
          }
          placeholder="Tell us what's on your mind..."
          className="
            w-full
            rounded-xl
            border
            bg-transparent
            px-4
            py-2
            resize-none
            outline-none
            focus:ring-2
            focus:ring-slate-300
          "
        />

        <p className="mt-2 text-xs text-right text-slate-500">
          {message.length} / {MAX_MESSAGE_LENGTH}
        </p>
      </div>

      <Input
        label="Email (Optional)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !category || !message.trim()}
        >
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
