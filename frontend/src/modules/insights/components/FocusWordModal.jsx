import { X } from "lucide-react";

import VocabularyCard from "../../vocabulary/components/VocabularyCard";

import { useVocabularyById } from "../../vocabulary/hooks/useVocabularyById";

import FocusWordModalSkeleton from "./FocusWordModalSkeleton";

const FocusWordModal = ({ userWordId, isOpen, onClose }) => {
  const {
    data: word,
    isLoading,
    isError,
  } = useVocabularyById(userWordId, isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/5
        backdrop-blur-[0.8px]
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
            relative
            w-full
            max-w-[40vw]
            max-h-[90vh]
            overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE ICON */}

        <button
          onClick={onClose}
          className="
            absolute
            right-3
            top-3
            z-20
            rounded-xl
            bg-white
            p-2
            shadow-md
            transition
            hover:bg-slate-100
          "
        >
          <X size={18} />
        </button>

        {/* LOADING */}

        {/* CONTENT */}

        {isLoading ? (
          <FocusWordModalSkeleton />
        ) : isError ? (
          <div
            className="
      rounded-2xl
      bg-white
      p-10
      text-center
    "
          >
            <p className="text-red-500">Failed to load vocabulary.</p>
          </div>
        ) : (
          <VocabularyCard word={word} readOnly />
        )}
      </div>
    </div>
  );
};

export default FocusWordModal;
