"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDraft = async () => {
    if (!prompt.trim()) {
      alert("Enter details first");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      setResult(data.result || data.error);
    } catch (err) {
      setResult("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg, #0b1c3f, #132a5e, #1f3b8a)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img src="/llb-logo.png" style={{ width: "60px" }} />
          <h2>LLBAI</h2>
        </div>

        <h1>Unlock The World Of Law</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your legal problem..."
          style={{
            width: "100%",
            height: "150px",
            marginTop: "20px",
            padding: "10px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={generateDraft}
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            background: "#FFD700",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Draft"}
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#0f2149",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {result || "Your draft will appear here"}
        </div>
      </div>
    </main>
  );
}
