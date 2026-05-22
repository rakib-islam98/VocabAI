const Textarea = ({
  className = "",
  ...props
}) => {
  return (
    <textarea
      className={`
        w-full rounded-lg border border-gray-300
        px-4 py-3 outline-none
        focus:ring-2 focus:ring-black
        ${className}
      `}
      {...props}
    />
  );
};

export default Textarea;