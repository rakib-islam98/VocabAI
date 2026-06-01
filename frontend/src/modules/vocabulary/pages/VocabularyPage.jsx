import { useState } from "react";

import AddWordModal from "../components/AddWordModal";

import VocabularyList from "../components/VocabularyList";

import VocabularyToolbar from "../components/VocabularyToolbar";

import { useVocabulary } from "../hooks/useVocabulary";

import { useDebounce } from "../hooks/useDebounce";

import EmptyState from "../../../components/common/EmptyState";

import VocabularyCardSkeleton from "../components/VocabularyCardSkeleton";

import Container from "../../../components/ui/Container";

import { Plus } from "lucide-react";

const VocabularyPage = () => {
  const [search, setSearch] =
  useState("");

  const [sort, setSort] =
    useState("newest");

  const debouncedSearch =
    useDebounce(search, 400);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVocabulary(
    debouncedSearch,
    sort
  );

  const words =
    data?.pages.flatMap(
      (page) => page.data
    ) || [];

  return (
    <>
      {/* MODAL */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Container>
        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            onClick={() => setIsModalOpen(true)}
            className="
              flex items-center justify-center gap-2
              self-start
              bg-slate-900 text-white
              px-4 py-2 rounded-xl
              hover:bg-slate-800
              active:scale-[0.98]
              transition-all duration-200
              "
          >
            <Plus size={18} />

            <span className="font-medium">Add Word</span>
          </button>
        </div>

        {/* TOOLBAR */}
        <VocabularyToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        {/* LOADING */}
        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <VocabularyCardSkeleton key={index} />
            ))}
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
            title={
              search.trim() ? "No matching words found" : "No vocabulary yet"
            }
            description={
              search.trim()
                ? `No results found for "${search}".`
                : "Start building your AI-powered vocabulary collection."
            }
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
      </Container>
    </>
  );
};

export default VocabularyPage;