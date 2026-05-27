import { useState } from "react";

import AddWordModal from "../components/AddWordModal";

import VocabularyList from "../components/VocabularyList";

import { useVocabulary } from "../hooks/useVocabulary";

import EmptyState from "../../../components/common/EmptyState";

import Container from "../../../components/ui/Container";

import { Plus } from "lucide-react";

const VocabularyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVocabulary();

  const words =
    data?.pages.flatMap(
      (page) => page.data
    ) || [];

  return (
    <>
      {/* MODAL */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      />

      <Container>
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between mb-8">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Vocabulary
            </h1>

            <p className="text-slate-500 mt-1">
              Build and review your AI-powered vocabulary collection.
            </p>
          </div>

          {/* ADD WORD BUTTON */}
          <button
            onClick={() =>
              setIsModalOpen(true)
            }
            className="
              flex items-center gap-2
              bg-slate-900 text-white
              px-4 py-2 rounded-xl
              hover:bg-slate-800
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            <Plus size={18} />

            <span className="font-medium">
              Add Word
            </span>
          </button>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="text-slate-500">
              Loading vocabulary...
            </p>
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="flex justify-center py-20">
            <p className="text-red-500">
              Failed to load vocabulary.
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          !isError &&
          words.length === 0 && (
            <EmptyState
              title="No vocabulary yet"
              description="Start building your AI-powered vocabulary collection."
            />
          )}

        {/* LIST */}
        {!isLoading &&
          !isError &&
          words.length > 0 && (
            <VocabularyList
              words={words}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={
                isFetchingNextPage
              }
            />
          )}
      </Container>
    </>
  );
};

export default VocabularyPage;