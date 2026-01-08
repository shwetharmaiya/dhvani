"use client";

import { useState } from "react";

export default function KannadaGoogleTTS() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSpeech = async () => {
    if (!text) return;

    setLoading(true);
    setAudioUrl(null);

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      setLoading(false);
      alert("TTS failed");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Dhvani : Kannada Text to Speech
        </h1>

        <textarea
          className="w-full h-32 p-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="ಕನ್ನಡ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={generateSpeech}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Speak"}
        </button>

        {audioUrl && (
          <audio
            controls
            autoPlay
            src={audioUrl}
            className="w-full mt-4"
          />
        )}

        <p className="text-xs text-gray-500 text-center">
          Powered by Google Cloud Kannada Neural Voice
        </p>
      </div>
    </main>
  );
}
