import { useState } from "react";

export default function ErrorInput({ onSubmit }) {
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorText.trim()) return;
    onSubmit(errorText);
    setErrorText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <textarea
        className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Paste your programming error here..."
        value={errorText}
        onChange={(e) => setErrorText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Explain Error
      </button>
    </form>
  );
}
