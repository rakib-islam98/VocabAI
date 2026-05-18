export default function Button({
  children,
  loading,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="
        w-full
        h-12
        rounded-xl
        bg-black
        text-white
        font-medium
        transition
        hover:opacity-90
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}