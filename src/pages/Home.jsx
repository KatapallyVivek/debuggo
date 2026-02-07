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
      console.log("Tambo raw response:", data);

      setExplanation(
        data.explanation?.trim() ||
          "Hmm… Tambo couldn’t explain this error. Try a different one!"
      );
    } catch (err) {
      console.error(err);
      setExplanation("Error fetching explanation. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Explain This Error 🚀</h1>

      {/* Error input */}
      <ErrorInput onSubmit={handleExplain} />

      {/* Explanation box */}
      <div className="mt-8 w-full max-w-xl">
        {loading && <p className="text-gray-500">Analyzing error...</p>}

        {!loading && explanation && (
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Explanation:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
