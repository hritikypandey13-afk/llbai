"use client";

import { useState } from "react";

export default function Home() {
  const [draftType, setDraftType] = useState("Legal Notice");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDraft = async () => {
    if (!prompt.trim()) {
      alert("Please enter your case details first.");
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
          prompt: `Draft Type: ${draftType}\n\nFacts:\n${prompt}`,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.result || "No response received.");
      }
    } catch (err) {
      setResult("Something went wrong while generating the draft.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0b1c3f",
        color: "white",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <img
          src="/llb-logo.png"
          alt="LLBAI Logo"
          style={{ width: "64px", height: "64px", objectFit: "contain" }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: "48px" }}>LLBAI</h2>
          <p style={{ margin: 0, color: "#d5d9e3" }}>Unlock The World Of Law</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontSize: "62px", marginBottom: "16px" }}>
          Unlock The World Of Law
        </h1>
        <p style={{ fontSize: "20px", color: "#d5d9e3" }}>
          AI-powered legal drafting, research & automation
        </p>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto 0",
          background: "#132a5e",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Generate Your Draft</h3>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Draft Type
        </label>
        <select
          value={draftType}
          onChange={(e) => setDraftType(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "18px",
            fontSize: "16px",
          }}
        >
          <option>Legal Notice</option>
          <option>Police Complaint</option>
          <option>Application</option>
          <option>Synopsis</option>
          <option>Bail Application</option>
        </select>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Enter Facts / Instructions
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Draft a legal notice for non-payment of professional fees despite repeated reminders..."
          style={{
            width: "100%",
            minHeight: "180px",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            resize: "vertical",
            marginBottom: "18px",
          }}
        />

        <button
          onClick={generateDraft}
          style={{
            padding: "14px 24px",
            background: "#FFD700",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {loading ? "Generating..." : "Generate Draft"}
        </button>

        <div
          style={{
            marginTop: "24px",
            background: "#0f2149",
            padding: "18px",
            borderRadius: "12px",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
            minHeight: "160px",
          }}
        >
          {result || "Your generated draft will appear here."}
        </div>
      </div>
    </main>
  );
}
