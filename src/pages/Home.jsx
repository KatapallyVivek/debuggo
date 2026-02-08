import { useState } from "react";
import ErrorInput from "../components/ErrorInput";

export default function Home() {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async (errorText) => {
    if (!errorText.trim()) return;
    setLoading(true);
    setExplanation("");

    const projectId = import.meta.env.VITE_TAMBO_PROJECT_ID;
    const apiKey = import.meta.env.VITE_TAMBO_API_KEY;

    try {
      const response = await fetch(
        `https://api.tambo.co/v1/projects/${projectId}/errors:explain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ error: errorText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setExplanation(
        data.explanation?.trim() ||
          "AI couldn’t explain this error. Try another one."
      );
    } catch (err) {
      console.error(err);
      setExplanation("Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-lg sm:text-xl font-semibold text-white">
            Debuggo<span className="text-indigo-400">.</span>
          </h1>
        </div>
      </header>

      {/* MAIN */}
      <main
        className="
          min-h-screen
          pt-24 sm:pt-28
          px-4 sm:px-6
          bg-gradient-to-br from-[#0b0b16] via-[#171734] to-[#0b0b16]
        "
      >
        <div
          className="
            max-w-6xl mx-auto
            grid grid-cols-1 lg:grid-cols-2
            gap-10 lg:gap-14
          "
        >
          {/* INPUT */}
          <section className="flex flex-col space-y-4">
            <h2 className="text-lg sm:text-xl font-medium text-white">
              Input
            </h2>

            <div className="bg-white/5 rounded-xl p-4 sm:p-6">
              <ErrorInput onSubmit={handleExplain} />
            </div>
          </section>

          {/* OUTPUT */}
          <section className="flex flex-col space-y-4">
            <h2 className="text-lg sm:text-xl font-medium text-white">
              Output
            </h2>

            <div
              className="
                min-h-[240px] sm:min-h-[320px]
                rounded-xl
                bg-white/5
                p-4 sm:p-6
                overflow-y-auto
              "
            >
              {loading && (
                <p className="text-gray-400 animate-pulse">
                  Thinking…
                </p>
              )}

              {!loading && explanation && (
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                  {explanation}
                </p>
              )}

              {!loading && !explanation && (
                <p className="text-gray-500 text-sm sm:text-base">
                  Output will appear here.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
