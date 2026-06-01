import { useState } from "react";
import FocusWordModal from "./FocusWordModal";

import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const InsightsWeakWords = ({
  weakestWords,
}) => {
  const [expanded, setExpanded] =
    useState(false);

  const [selectedWordId, setSelectedWordId,] = 
    useState(null);

  const words = weakestWords || [];

  const visibleWords = expanded
    ? words
    : words.slice(0, 5);

  const handleOpenWord = (userWordId) => {
    setSelectedWordId(userWordId);
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <AlertTriangle
          size={18}
          className="text-amber-500"
        />

        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Focus Area
        </h2>
      </div>

      <p
        className="
          mt-1
          text-sm
          text-slate-500
        "
      >
        Words that currently need the
        most reinforcement.
      </p>

      {/* EMPTY STATE */}

      {words.length === 0 ? (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-6
            py-10
            text-center
          "
        >
          <h3
            className="
              font-semibold
              text-emerald-700
            "
          >
            No focus words right now 🎉
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-emerald-600
            "
          >
            Your vocabulary performance
            looks healthy. Continue
            reviewing regularly to keep
            your mastery levels strong.
          </p>
        </div>
      ) : (
        <>
          {/* TABLE */}

          <div className="mt-6">
            <div
              className="
                overflow-x-auto
                rounded-2xl
                border
                border-slate-200
              "
            >
              {/* HEADER */}

              <div
                className="
                  grid
                  grid-cols-[60px_minmax(140px,1fr)_100px_90px]
                  min-w-[420px]
                  border-b
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                <div>Rank</div>

                <div>Word</div>

                <div>Mastery</div>

                <div>Mistakes</div>
              </div>

              {/* ROWS */}

              {visibleWords.map(
                (word, index) => (
                  <div
                    key={word.word}
                    className="
                      grid
                      grid-cols-[60px_minmax(140px,1fr)_100px_90px]
                      min-w-[420px]
                      items-center
                      border-b
                      border-slate-100
                      px-5
                      py-4
                      last:border-b-0
                    "
                  >
                    <div
                      className="
                        font-semibold
                        text-slate-400
                      "
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleOpenWord(word.id)
                        }
                        className="
                          font-semibold
                          text-slate-900
                          transition-colors
                          hover:text-indigo-600
                          hover:underline
                          cursor-pointer
                        "
                      >
                        {word.word}
                      </button>
                      <FocusWordModal
                        userWordId={
                          selectedWordId
                        }
                        isOpen={
                          !!selectedWordId
                        }
                        onClose={() =>
                          setSelectedWordId(null)
                        }
                      />
                    </div>
                    <div>
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-red-50
                          px-3
                          py-1
                          text-sm
                          font-semibold
                          text-red-600
                        "
                      >
                        {
                          word.masteryScore
                        }
                        %
                      </span>
                    </div>

                    <div
                      className="
                        text-sm
                        text-slate-600
                      "
                    >
                      {
                        word.wrongAttempts
                      }{" "}
                      mistakes
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* VIEW MORE */}

          {words.length > 5 && (
            <div
              className="
                mt-4
                flex
                justify-center
              "
            >
              <button
                onClick={() =>
                  setExpanded(
                    !expanded
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                {expanded ? (
                  <>
                    <ChevronUp
                      size={16}
                    />
                    View Less
                  </>
                ) : (
                  <>
                    <ChevronDown
                      size={16}
                    />
                    View More
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InsightsWeakWords;