import React, { useEffect, useState } from "react";

import { Volume2, Sparkles, Quote, Loader2, Trash2 } from "lucide-react";

import { pronounceWord } from "../utils/pronounceWord";

import { useDeleteVocabulary } from "../hooks/useDeleteVocabulary";

import DeleteVocabularyModal from "./DeleteVocabularyModal";

const VocabularyCard = ({ word }) => {
  const [activeTab, setActiveTab] = useState("hinglish");

  const [translatedText, setTranslatedText] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);

  const [imageLoading, setImageLoading] = useState(!!word.imageUrl);

  const [imageError, setImageError] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deleteWord, isPending: isDeleting } =
  useDeleteVocabulary();

  //handle delete
  const handleDelete = () => {
    deleteWord(word.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
    });
  };

  // PRELOAD IMAGE
  useEffect(() => {
    if (!word.imageUrl) {
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    setImageError(false);

    let isMounted = true;

    const img = new Image();

    img.src = word.imageUrl;

    img.onload = () => {
      if (!isMounted) return;

      setImageLoading(false);
      setImageError(false);
    };

    img.onerror = () => {
      if (!isMounted) return;

      setImageLoading(false);
      setImageError(true);
    };

    return () => {
      isMounted = false;
    };
  }, [word.imageUrl]);

  // Dynamic Translation Engine
  const handleTranslate = async (textToTranslate) => {
    if (!textToTranslate) return;

    setIsTranslating(true);

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
          textToTranslate,
        )}`,
      );

      const data = await response.json();

      const translation = data[0].map((subArray) => subArray[0]).join("");

      setTranslatedText(translation);
    } catch (error) {
      console.error("Translation error:", error);

      setTranslatedText("Could not load translation automatically.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "english" && !translatedText && !isTranslating) {
      handleTranslate(word.hinglishExplanation);
    }
  };

  return (
    <article
      className="
        w-full bg-white
        rounded-2xl
        border border-slate-200/60
        shadow-xs overflow-hidden
        flex flex-col justify-between
        transition-all duration-200
        hover:shadow-md
        hover:border-slate-300/80
      "
    >
      {/* CARD BODY */}
      <div className="p-5 space-y-4">
        {/* TOP ROW */}
        <div
          className="
            flex gap-3.5
            items-center justify-between
          "
        >
          {/* IMAGE */}
          <div
            className="
              relative
              w-36 h-28
              shrink-0
              rounded-2xl
              overflow-hidden
              border border-slate-200/70
              bg-gradient-to-br
              from-indigo-50
              to-slate-100
              flex items-center
              justify-center
              shadow-inner
            "
          >
            {/* LOADER */}
            {word.imageUrl && imageLoading && (
              <div
                className="
                    absolute inset-0
                    flex items-center
                    justify-center
                    bg-slate-100
                  "
              >
                <Loader2
                  size={20}
                  className="
                      animate-spin
                      text-indigo-500
                    "
                />
              </div>
            )}

            {/* IMAGE */}
            {word.imageUrl && !imageLoading && !imageError && (
              <img
                src={word.imageUrl}
                alt={word.word}
                loading="lazy"
                className="
                    w-full h-full
                    object-cover
                    object-center
                  "
              />
            )}

            {/* FALLBACK */}
            {(!word.imageUrl || imageError) && (
              <span
                className="
                  absolute inset-0
                  flex items-center
                  justify-center
                  text-3xl uppercase
                  tracking-wider
                  font-bold
                  text-indigo-500
                  select-none
                "
              >
                {word.word.charAt(0)}
              </span>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0 space-y-1">
            <div
              className="
                flex items-center
                gap-2 flex-wrap
              "
            >
              <h2
                className="
                  text-xl font-extrabold
                  text-slate-900
                  tracking-tight
                  capitalize truncate
                "
              >
                {word.word}
              </h2>

              {word.partOfSpeech && (
                <span
                  className="
                    px-2 py-0.5
                    text-[9px]
                    font-bold uppercase
                    tracking-wider
                    rounded
                    bg-indigo-50
                    text-indigo-600
                    border
                    border-indigo-100/50
                  "
                >
                  {word.partOfSpeech}
                </span>
              )}
            </div>

            {word.hindiMeaning && (
              <p
                className="
                  text-lg font-bold
                  text-slate-700
                  tracking-wide
                  font-hindi
                "
              >
                {word.hindiMeaning}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-2">
            {/* DELETE */}
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="
      p-2 rounded-lg
      bg-red-50
      border border-red-100
      text-red-400
      hover:bg-red-100
      hover:text-red-600
      transition
      active:scale-95
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
              aria-label="Delete word"
            >
              {isDeleting ? (
                <Loader2 size={15} className="animate-spin stroke-[2.5]" />
              ) : (
                <Trash2 size={15} className="stroke-[2.5]" />
              )}
            </button>

            {/* AUDIO */}
            <button
              onClick={() => pronounceWord(word.word)}
              className="
      p-2 rounded-lg
      bg-slate-50
      border border-slate-200
      text-slate-400
      hover:bg-indigo-50
      hover:text-indigo-600
      hover:border-indigo-100
      transition
      active:scale-95
    "
              aria-label="Pronounce word"
            >
              <Volume2 size={15} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* EXPLANATION */}
        {word.hinglishExplanation && (
          <div className="space-y-2">
            {/* TABS */}
            <div
              className="
                flex p-0.5
                bg-slate-100
                rounded-lg
                max-w-[160px]
              "
            >
              <button
                onClick={() => handleTabChange("hinglish")}
                className={`
                  flex-1 py-0.5
                  text-[11px]
                  font-bold rounded
                  transition-all
                  ${
                    activeTab === "hinglish"
                      ? "bg-white text-slate-950 shadow-xs"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                Hinglish
              </button>

              <button
                onClick={() => handleTabChange("english")}
                className={`
                  flex-1 py-0.5
                  text-[11px]
                  font-bold rounded
                  transition-all
                  ${
                    activeTab === "english"
                      ? "bg-white text-slate-950 shadow-xs"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                English
              </button>
            </div>

            {/* CONTENT */}
            <div
              className="
                bg-slate-50/70
                rounded-xl p-3
                border border-slate-100
                text-[13px]
                leading-relaxed
                text-slate-600
                min-h-[54px]
                flex items-center
              "
            >
              {activeTab === "hinglish" && <p>{word.hinglishExplanation}</p>}

              {activeTab === "english" && (
                <>
                  {isTranslating ? (
                    <div
                      className="
                        flex items-center
                        gap-2
                        text-slate-400
                        font-medium py-1
                      "
                    >
                      <Loader2
                        size={13}
                        className="
                          animate-spin
                          text-indigo-500
                        "
                      />

                      <span>Translating context...</span>
                    </div>
                  ) : (
                    <p
                      className="
                        italic font-light
                        text-slate-700
                      "
                    >
                      {translatedText || "No translation found."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* EXAMPLE + CONTEXT */}
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            gap-3 pt-1
            border-t border-slate-100
          "
        >
          {word.example && (
            <div className="space-y-0.5">
              <span
                className="
                  inline-flex items-center
                  gap-1
                  text-[9px]
                  font-bold
                  text-slate-400
                  uppercase tracking-wider
                "
              >
                <Quote size={8} />
                Example
              </span>

              <p
                className="
                  text-slate-500
                  text-[12px]
                  leading-snug italic
                  line-clamp-2
                  pl-2
                  border-l border-slate-200
                "
              >
                "{word.example}"
              </p>
            </div>
          )}

          {word.sourceSentence && (
            <div className="space-y-0.5">
              <span
                className="
                  inline-flex items-center
                  gap-1
                  text-[9px]
                  font-bold
                  text-indigo-400
                  uppercase tracking-wider
                "
              >
                <Sparkles size={8} />
                Context
              </span>

              <p
                className="
                  text-slate-600
                  text-[12px]
                  leading-snug
                  font-medium
                  line-clamp-2
                  pl-2
                  border-l border-indigo-200
                "
              >
                "{word.sourceSentence}"
              </p>
            </div>
          )}
        </div>
      </div>
      <DeleteVocabularyModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        word={word.word}
      />
    </article>
  );
};

export default VocabularyCard;
