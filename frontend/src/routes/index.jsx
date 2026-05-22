import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import VocabularyPage from "../modules/vocabulary/pages/VocabularyPage";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export const router =
  createBrowserRouter([
    {
      path: "/",

      element: (
        <Navigate
          to="/vocabulary"
          replace
        />
      ),
    },

    {
      path: "/vocabulary",

      element: (
        <ProtectedRoute>
          <VocabularyPage />
        </ProtectedRoute>
      ),
    },

    {
      path: "/login",

      element: (
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      ),
    },

    {
      path: "/register",

      element: (
        <GuestRoute>
          <RegisterPage />
        </GuestRoute>
      ),
    },
  ]);