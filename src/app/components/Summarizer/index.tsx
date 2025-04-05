"use client";

import { useState, useEffect } from "react";

export default function Summarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [displayedSummary, setDisplayedSummary] = useState<string>(""); // For typing effect
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setSummary(null);
      setDisplayedSummary(""); // Reset displayed text
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setDisplayedSummary(""); // Clear previous summary

    const formData = new FormData();
    formData.append("file", file);
    console.log("Sending file:", file.name);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      console.log('...data...', data)

      if (res.ok) {
        setSummary(data.summary); // Set full summary for typing
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect logic
  useEffect(() => {
    if (!summary) return; // Do nothing if no summary

    // let index = 0;
    let index = -1;
    setDisplayedSummary(""); // Reset displayed text
    const typingSpeed = 50; // Milliseconds per character (adjust as needed)

    const typeText = () => {
      if (index < summary.length - 1) {
        console.log('summary.idnedx..', summary[index])
        setDisplayedSummary((prev) => prev + summary[index]);
        index++;
        setTimeout(typeText, typingSpeed);
      }
    };

    typeText();

    // Cleanup to avoid multiple timers
    return () => {
      index = summary.length; // Stop typing on unmount or new summary
    };
  }, [summary]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">AI Study Buddy</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Summarizing..." : "Get Summary"}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded max-w-2xl">
          <p>{error}</p>
        </div>
      )}
      {displayedSummary && (
        <div className="mt-6 p-4 bg-gray-100 rounded max-w-2xl">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>{displayedSummary}</p>
        </div>
      )}
    </div>
  );
}