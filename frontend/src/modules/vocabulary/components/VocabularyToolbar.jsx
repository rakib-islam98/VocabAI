const VocabularyToolbar = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search words..."
        className="
          w-full md:max-w-md
          rounded-xl
          border border-slate-200
          px-4 py-2.5
          text-sm
          outline-none
          focus:ring-2 focus:ring-slate-300
        "
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
            h-11
            min-w-[130px]
            rounded-xl
            border border-slate-200
            bg-white
            px-4
            text-sm
            font-medium
            shadow-sm
            outline-none
            focus:ring-2
            focus:ring-slate-300
        "
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  );
};

export default VocabularyToolbar;
