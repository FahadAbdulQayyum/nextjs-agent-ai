"use client";

import { useState } from "react";

export default function QuizCreator() {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setSummary(null); // Reset summary when new file is selected
      setError(null);   // Reset error
    }
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setSummary(null); // Reset summary when new text is entered
    setError(null);   // Reset error
  };

  // Handle form submission for both file and text input
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !textInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let formData;
      if (file) {
        // File upload logic
        formData = new FormData();
        formData.append("file", file);
      } else {
        // Text input logic
        formData = new URLSearchParams();
        formData.append("text", textInput);
      }

      const res = await fetch("/api/quiz-generator", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">AI Quiz Generator Buddy</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        {/* File Input */}
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />

        {/* OR Separator */}
        <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Enter your question or topic here..."
          value={textInput}
          onChange={handleTextChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-commonColor"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file && !textInput.trim() && !loading}
          className="w-full px-4 py-2 bg-commonColor text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Generating Quiz..." : "Get Quiz"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded max-w-2xl">
          <p>{error}</p>
        </div>
      )}

      {/* Summary Display */}
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded max-w-2xl">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}