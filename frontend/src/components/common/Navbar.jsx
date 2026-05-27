import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAuthStore from "../../store/authStore";

import { logoutUser } from "../../modules/auth/services/auth.service";

import ConfirmDialog from "./ConfirmDialog";

import Container from "../ui/Container";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const user = useAuthStore(
    (state) => state.user
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

      navigate("/login");
    } catch (error) {
      toast.error(
        "Failed to logout"
      );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <Container className="h-16 flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-10">
            
            <NavLink
              to="/vocabulary"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              VocabAI
            </NavLink>

            <nav className="flex items-center gap-6">
              
              <NavLink
                to="/vocabulary"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`
                }
              >
                Vocabulary
              </NavLink>

              <NavLink
                to="/review"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`
                }
              >
                Practice
              </NavLink>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            <p className="text-sm font-medium text-slate-600">
              {user?.name}
            </p>

            <button
              onClick={() =>
                setShowLogoutDialog(true)
              }
              className="
                text-sm font-medium
                text-red-500
                hover:text-red-600
                transition-colors
              "
            >
              Logout
            </button>
          </div>
        </Container>
      </header>

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

export default Navbar;