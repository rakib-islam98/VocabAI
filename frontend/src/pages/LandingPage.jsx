import { Link } from "react-router-dom";

import previewImage from "../assets/vocabai-preview.png";

import useAuthStore from "../store/authStore";

export default function LandingPage() {
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">VocabAI</h1>

          <Link
            to="/login"
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
              AI-Powered Vocabulary Learning
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Learn vocabulary from
              <span className="block text-indigo-600">real-life contexts</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Save words you discover while reading, watching videos, browsing
              articles, or having conversations.
            </p>

            <p className="mt-4 text-lg text-slate-600 leading-8">
              Get AI-generated meanings, Hinglish explanations, adaptive review
              sessions, and learning insights.
            </p>

            <div className="mt-8 space-y-3">
              <div>✓ AI-powered explanations</div>
              <div>✓ Smart review sessions</div>
              <div>✓ Vocabulary insights</div>
              <div>✓ Visual memory reinforcement</div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={
                    isAuthenticated
                    ? "/vocabulary"
                    : "/register"
                }
                className="
                  px-6 py-3
                  rounded-xl
                  bg-slate-900
                  text-white
                  font-medium
                  hover:bg-slate-800
                "
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="
                  px-6 py-3
                  rounded-xl
                  border
                  border-slate-300
                  font-medium
                "
              >
                Login
              </Link>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden border shadow-lg">
                <img
                src={previewImage}
                alt="VocabAI Preview"
                className="w-full max-h-[500px] object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Capture"
              description="Save words together with the sentence where you found them."
            />

            <FeatureCard
              title="Understand"
              description="Get AI-generated meanings, examples, explanations, and context."
            />

            <FeatureCard
              title="Practice"
              description="Review words through adaptive sessions and reinforce memory."
            />
          </div>
        </div>
      </section>

      {/* Flow */}

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <Step text="Add Word" />
            <Step text="AI Enrichment" />
            <Step text="Review Sessions" />
            <Step text="Learning Insights" />
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl bg-slate-900 text-white p-12 text-center">
            <h2 className="text-4xl font-bold">
              Start building your personal vocabulary library today.
            </h2>

            <Link
              to="/register"
              className="
                inline-flex
                mt-8
                px-6
                py-3
                rounded-xl
                bg-white
                text-slate-900
                font-semibold
              "
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 border">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-slate-600">{description}</p>
    </div>
  );
}

function Step({ text }) {
  return <div className="border rounded-2xl p-6 font-medium">{text}</div>;
}
