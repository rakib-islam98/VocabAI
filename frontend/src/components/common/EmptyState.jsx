export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="
      bg-white
      border
      border-gray-200
      rounded-2xl
      p-10
      text-center
    ">
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}