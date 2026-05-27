const ReviewOptionButton = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left
        rounded-2xl border
        p-5
        transition-all duration-200

        ${
          isSelected
            ? "border-slate-900 bg-slate-100"
            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        }
      `}
    >
      <p className="text-base font-medium text-slate-800">
        {option}
      </p>
    </button>
  );
};

export default ReviewOptionButton;