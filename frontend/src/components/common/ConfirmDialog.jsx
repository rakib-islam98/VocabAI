import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDanger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        p-4
      "
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={onCancel}
      />

      {/* MODAL */}
      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl bg-white
          border border-slate-200
          shadow-2xl
          p-6
          animate-in fade-in zoom-in-95
        "
      >
        {/* ICON */}
        <div
          className={`
            w-14 h-14 rounded-2xl
            flex items-center justify-center
            mb-5
            ${
              isDanger
                ? "bg-red-50 text-red-500"
                : "bg-slate-100 text-slate-700"
            }
          `}
        >
          <AlertTriangle size={24} />
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-slate-500 leading-7 text-sm">
            {description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={onCancel}
            className="
              flex-1 h-11 rounded-2xl
              border border-slate-200
              text-slate-700 font-medium
              hover:bg-slate-50
              transition
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`
              flex-1 h-11 rounded-2xl
              text-white font-medium
              transition
              ${
                isDanger
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-black hover:opacity-90"
              }
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;