import { useEffect, useRef } from "react";

import VocabularyCard from "./VocabularyCard";

const VocabularyList = ({
  words,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (
          first.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentTarget =
      observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  return (
    <>
      <div
        className="
          grid gap-6
          lg:grid-cols-2
        "
      >
        {words.map((word) => (
          <VocabularyCard
            key={word.id}
            word={word}
          />
        ))}
      </div>

      <div
        ref={observerTarget}
        className="h-10 flex items-center justify-center"
      >
        {isFetchingNextPage && (
          <p className="text-sm text-slate-400">
            Loading more words...
          </p>
        )}
      </div>
    </>
  );
};

export default VocabularyList;