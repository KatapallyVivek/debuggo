import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import ErrorInput from "../components/ErrorInput";
import bgImage from "../assets/DebugImg.jpg";

export default function Home() {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("debuggo-theme") === "light" ? false : true;
    }
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("debuggo-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("debuggo-theme", "light");
    }
  }, [darkMode]);

  const handleExplain = async (errorText) => {
    if (!errorText.trim()) return;
    setLoading(true);
    setExplanation("");

    try {
      const response = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: errorText }),
      });
      const data = await response.json();
      setExplanation(
        data.explanation?.trim() || "AI couldn’t explain this error. Try another one."
      );
    } catch (err) {
      console.error(err);
      setExplanation("Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transition-colors duration-500">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 dark:bg-white/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-indigo-400" />
            <h1 className="text-lg sm:text-xl font-semibold text-white dark:text-white">
              Debuggo<span className="text-indigo-400">.</span>
            </h1>
          </div>

          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-900" />
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="pt-32 sm:pt-36 px-4 sm:px-6 text-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

        <div className="relative z-10 inline-block mb-8 px-4 py-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
            Analyze your errors <br />
            <span className="text-indigo-400 font-light">
              Quickly, clearly, professionally
            </span>
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Paste your error messages below and get AI-powered explanations instantly.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="min-h-screen pt-24 sm:pt-28 px-4 sm:px-6 bg-gradient-to-br from-[#0b0b16] via-[#171734] to-[#0b0b16] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* INPUT */}
          <section className="flex flex-col space-y-4 h-full">
            <h2 className="text-lg sm:text-xl font-medium text-white dark:text-gray-200">Input</h2>
            <div className="bg-white/5 dark:bg-gray-800 rounded-xl p-4 sm:p-6 flex-1">
              <ErrorInput onSubmit={handleExplain} />
            </div>
          </section>

          {/* OUTPUT */}
          <section className="flex flex-col space-y-4 h-full">
            <h2 className="text-lg sm:text-xl font-medium text-white dark:text-gray-200">Output</h2>
            <div className="min-h-[240px] sm:min-h-[320px] rounded-xl bg-white/5 dark:bg-gray-800 p-4 sm:p-6 overflow-y-auto flex-1">
              {loading && <p className="text-gray-400 animate-pulse">Thinking…</p>}

              {!loading && explanation && (
                <p className="text-gray-200 dark:text-gray-100 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                  {explanation}
                </p>
              )}

              {!loading && !explanation && (
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  Output will appear here.
                </p>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
