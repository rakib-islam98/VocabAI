import { useState } from "react";

import { LogOut, Plus } from "lucide-react";

import toast from "react-hot-toast";

import useAuthStore from "../../../store/authStore";

import { logoutUser } from "../../auth/services/auth.service";

import ConfirmDialog from "../../../components/common/ConfirmDialog";

const VocabularyHeader = ({ onAddWord }) => {
  const logout = useAuthStore(
    (state) => state.logout
  );

  const [
    showLogoutDialog,
    setShowLogoutDialog,
  ] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      logout();

      toast.success(
        "Logged out successfully"
      );

      setShowLogoutDialog(false);

      window.location.href =
        "/login";
    } catch (error) {
      toast.error(
        "Failed to logout"
      );
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* LOGO */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              VocabAI
            </h1>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {/* ADD WORD */}
            <button
              onClick={onAddWord}
              className="
                flex items-center gap-2
                bg-slate-900 text-white
                px-4 py-2 rounded-xl
                hover:bg-slate-800
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              <Plus size={18} />

              <span className="font-medium">
                Add Word
              </span>
            </button>

            {/* LOGOUT */}
            <button
              onClick={() =>
                setShowLogoutDialog(true)
              }
              className="
                p-2 rounded-xl border
                border-slate-200
                text-slate-600
                hover:bg-slate-100
                hover:text-slate-900
                transition-all duration-200
              "
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* CONFIRM LOGOUT */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Logout?"
        description="You’ll need to login again to access your vocabulary collection."
        confirmText="Logout"
        cancelText="Stay Here"
        isDanger={true}
        onCancel={() =>
          setShowLogoutDialog(false)
        }
        onConfirm={handleLogout}
      />
    </>
  );
};

export default VocabularyHeader;