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
    <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
        className="
          w-full h-64 p-4
          bg-black/40 text-gray-200
          border border-white/10
          rounded-2xl resize-none
          placeholder-gray-500
          focus:outline-none
          focus:ring-2 focus:ring-violet-500
          transition-all
        "
        placeholder="TypeError: Cannot read property 'map' of undefined..."
        value={errorText}
        onChange={(e) => setErrorText(e.target.value)}
        />

      <button
        type="submit"
        className="
          w-full py-3 rounded-2xl mt-4
          bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500
          text-white font-semibold
          hover:scale-[1.03]
          hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]
          active:scale-95
          transition-all duration-300
        "
      >
        Explain Error
      </button>

    </form>

  );
}
