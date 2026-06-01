import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthStore from "../../store/authStore";

import { logoutUser } from "../../modules/auth/services/auth.service";

import ConfirmDialog from "./ConfirmDialog";

import Container from "../ui/Container";

const navLinks = [
  {
    label: "Vocabulary",
    to: "/vocabulary",
  },
  {
    label: "Practice",
    to: "/review",
  },
  {
    label: "Insights",
    to: "/insights",
  },
  {
    label: "Feedback",
    to: "/feedback",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      queryClient.clear();

      logout();

      toast.success("Logged out successfully");

      setMobileMenuOpen(false);
      setShowLogoutDialog(false);

      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <Container className="h-16 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4 md:gap-10">
            <NavLink
              to="/vocabulary"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              VocabAI
            </NavLink>

            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-sm font-medium text-slate-600">
              {user?.name}
            </p>

            <button
              onClick={() => setShowLogoutDialog(true)}
              className="
                hidden md:block
                text-sm
                font-medium
                text-red-500
                hover:text-red-600
                transition-colors
              "
            >
              Logout
            </button>
            <button
              className="md:hidden p-1"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white shadow-lg">
            <Container className="py-4">
              <div className="flex flex-col divide-y divide-slate-100">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 hover:text-slate-900"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="border-t pt-4">
                  <p className="mb-3 text-sm text-slate-600">{user?.name}</p>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutDialog(true);
                    }}
                    className="text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Logout?"
        description="You’ll need to login again to access your vocabulary collection."
        confirmText="Logout"
        cancelText="Stay Here"
        isDanger={true}
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
