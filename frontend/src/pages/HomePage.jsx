import AppLayout from "../layouts/AppLayout";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to VocabAI
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Your AI-powered contextual vocabulary learning platform.
        </p>
      </div>
    </AppLayout>
  );
}