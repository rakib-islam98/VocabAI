import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import VocabularyPage from "../modules/vocabulary/pages/VocabularyPage";

import ReviewPage from "../modules/review/pages/ReviewPage";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import AppLayout from "../layouts/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <Navigate to="/vocabulary" replace />,
  },

  {
    path: "/vocabulary",

    element: (
      <ProtectedRoute>
        <AppLayout>
          <VocabularyPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/review",

    element: (
      <ProtectedRoute>
        <AppLayout>
          <ReviewPage />
        </AppLayout>
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