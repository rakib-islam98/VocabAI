import { Link } from "react-router-dom";

import useAuthStore from "../../store/authStore";

export default function Navbar() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  return (
    <nav className="h-16 flex items-center justify-between">
      <Link to="/add-word">
        Add Word
      </Link>

      <Link to="/vocabulary">
        Vocabulary
      </Link>

      <Link
        to="/"
        className="text-xl font-semibold"
      >
        VocabAI
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <span className="text-sm text-gray-600">
            Logged In
          </span>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}