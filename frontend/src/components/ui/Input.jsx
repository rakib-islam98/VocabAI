export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className="
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-gray-300
          outline-none
          transition
          focus:ring-2
          focus:ring-black
        "
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}