import { useState } from "react";

import VocabularyHeader from "../components/VocabularyHeader";

import VocabularyList from "../components/VocabularyList";

import AddWordModal from "../components/AddWordModal";

import { useVocabulary } from "../hooks/useVocabulary";

import EmptyState from "../../../components/common/EmptyState";

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

  const words = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <VocabularyHeader onAddWord={() => setIsModalOpen(true)} />

      {/* MODAL */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="text-slate-500">Loading vocabulary...</p>
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="flex justify-center py-20">
            <p className="text-red-500">Failed to load vocabulary.</p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && words.length === 0 && (
          <EmptyState
            title="No vocabulary yet"
            description="Start building your AI-powered vocabulary collection."
          />
        )}

        {/* LIST */}
        {!isLoading && !isError && words.length > 0 && (
          <VocabularyList
            words={words}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </main>
    </div>
  );
};

export default VocabularyPage;
