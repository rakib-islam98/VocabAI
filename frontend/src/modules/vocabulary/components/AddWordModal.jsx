import { X } from "lucide-react";

import AddWordForm from "./AddWordForm";

import { useState } from "react";

const AddWordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          if (!isSubmitting) {
            onClose();
          }
        }}
      />

      {/* MODAL */}
      <div
        className="
          relative z-10
          w-full max-w-lg
          bg-white rounded-3xl
          shadow-2xl border
          p-7
          animate-in fade-in zoom-in-95
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Add New Word</h2>

            <p className="text-slate-500 mt-2 text-sm leading-6">
              Save vocabulary from real-life reading, conversations, and
              content.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="
              p-2 rounded-xl
              hover:bg-slate-100
              transition disabled:opacity-50
disabled:cursor-not-allowed
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <AddWordForm onSuccess={onClose} setIsSubmitting={setIsSubmitting} />
      </div>
    </div>
  );
};

export default AddWordModal;
