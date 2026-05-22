import { Loader2, Trash2, X } from "lucide-react";

const DeleteVocabularyModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  word,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        p-4
      "
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isDeleting) {
            onClose();
          }
        }}
      />

      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10
          w-full max-w-md
          bg-white rounded-3xl
          shadow-2xl border
          p-6
          animate-in fade-in zoom-in-95
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Delete Word</h2>

            <p className="text-slate-500 mt-2 text-sm leading-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">"{word}"</span>?
            </p>

            <p className="text-red-500 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="
              p-2 rounded-xl
              hover:bg-slate-100
              transition
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="
              px-4 py-2 rounded-xl
              border border-slate-200
              text-slate-600
              hover:bg-slate-50
              transition
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-xl
              bg-red-500
              text-white font-medium
              hover:bg-red-600
              transition
              disabled:opacity-50
            "
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVocabularyModal;
