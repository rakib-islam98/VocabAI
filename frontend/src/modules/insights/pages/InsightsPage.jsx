import Container from "../../../components/ui/Container";

import { useInsights } from "../hooks/useInsights";

import InsightsHero from "../components/InsightsHero";

import InsightsActivity from "../components/InsightsActivity";

import InsightsMastery from "../components/InsightsMastery";

import InsightsAccuracyTrend from "../components/InsightsAccuracyTrend";

import InsightsWeakWords from "../components/InsightsWeakWords";

import InsightsExercisePerformance from "../components/InsightsExercisePerformance";

import InsightsRecentlyMastered from "../components/InsightsRecentlyMastered";

import InsightsVocabularyGrowth from "../components/InsightsVocabularyGrowth";

const loadingMessages = [
  "Analyzing learning patterns...",
  "Calculating mastery distribution...",
  "Preparing performance insights...",
  "Building activity timeline...",
];

const InsightsPage = () => {
  const {
    data,
    isLoading,
    isError,
  } = useInsights();

  const insights = data?.data;

  if (isLoading) {
    return (
      <Container>
        <div
          className="
            flex
            min-h-[70vh]
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <div
            className="
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-slate-900
            "
          />

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Generating Insights
          </h2>

          <div className="mt-4 space-y-2">
            {loadingMessages.map(
              (message) => (
                <p
                  key={message}
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {message}
                </p>
              )
            )}
          </div>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div
          className="
            flex
            min-h-[60vh]
            items-center
            justify-center
          "
        >
          <div
            className="
              rounded-3xl
              border
              border-red-200
              bg-red-50
              p-8
              text-center
            "
          >
            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Failed to load insights
            </h2>

            <p
              className="
                mt-2
                text-slate-600
              "
            >
              Please try again in a few
              moments.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* PAGE HEADER */}

      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Insights
        </h1>

        <p
          className="
            mt-1
            text-slate-500
          "
        >
          Understand your learning
          progress, review performance,
          and vocabulary mastery.
        </p>
      </div>

      <div className="space-y-6">
        {/* HERO */}

        <InsightsHero
          hero={insights?.hero}
        />

        {/* ACTIVITY */}

        <InsightsActivity
          activity={insights?.activity}
        />

        {/* MASTERY + ACCURACY */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          <InsightsMastery
            masteryDistribution={
              insights?.masteryDistribution
            }
          />

          <InsightsAccuracyTrend
            accuracyTrend={
              insights?.accuracyTrend
            }
          />
        </div>

        {/* FOCUS AREA */}

        <InsightsWeakWords
          weakestWords={
            insights?.weakestWords
          }
        />

        {/* EXERCISE PERFORMANCE */}

        <InsightsExercisePerformance
          exercisePerformance={
            insights?.exercisePerformance
          }
        />

        {/* RECENTLY MASTERED */}

        <InsightsRecentlyMastered
          recentlyMasteredWords={
            insights?.recentlyMasteredWords
          }
        />

        {/* VOCABULARY GROWTH */}

        <InsightsVocabularyGrowth
          vocabularyGrowth={
            insights?.vocabularyGrowth
          }
        />
      </div>
    </Container>
  );
};

export default InsightsPage;