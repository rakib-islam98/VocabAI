import { createBrowserRouter, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import VocabularyPage from "../modules/vocabulary/pages/VocabularyPage";

import ReviewPage from "../modules/review/pages/ReviewPage";

import InsightsPage from "../modules/insights/pages/InsightsPage";

import FeedbackPage from "../modules/feedback/pages/FeedbackPage";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import AppLayout from "../layouts/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/insights",

    element: (
      <ProtectedRoute>
        <AppLayout>
          <InsightsPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/feedback",

    element: (
      <ProtectedRoute>
        <AppLayout>
          <FeedbackPage />
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
