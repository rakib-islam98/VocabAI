const FeedbackCategorySelector = ({ value, onChange, categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
            border
            transition-colors
            ${
              value === category
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FeedbackCategorySelector;
