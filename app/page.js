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
        background: "linear-gradient(135deg, #08162f 0%, #102a5c 45%, #1f3b8a 100%)",
        color: "white",
        minHeight: "100vh",
        padding: "30px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,215,0,0.12), transparent 28%), radial-gradient(circle at 85% 25%, rgba(255,255,255,0.08), transparent 22%), radial-gradient(circle at 70% 80%, rgba(255,215,0,0.08), transparent 25%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "30px",
          }}
        >
          <img
            src="/llb-logo.png"
            alt="LLBAI Logo"
            style={{ width: "64px", height: "64px", objectFit: "contain" }}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: "42px" }}>LLBAI</h2>
            <p style={{ margin: 0, color: "#d5d9e3", fontSize: "15px" }}>
              Unlock The World Of Law
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Unlock The World Of Law
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#d5d9e3",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            AI-powered legal drafting, research, and practical assistance for
            law students, young lawyers, and working professionals.
          </p>
        </div>

        <div
          style={{
            maxWidth: "1000px",
            margin: "40px auto 0",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "18px",
            padding: "26px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: "28px", marginBottom: "22px" }}>
            Generate Your Draft
          </h3>

          <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>
            Draft Type
          </label>
          <select
            value={draftType}
            onChange={(e) => setDraftType(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "18px",
              fontSize: "16px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.95)",
              color: "#111",
            }}
          >
            <option>Legal Notice</option>
            <option>Police Complaint</option>
            <option>Application</option>
            <option>Synopsis</option>
            <option>Bail Application</option>
          </select>

          <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>
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
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.96)",
              color: "#111",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={generateDraft}
            style={{
              padding: "14px 24px",
              background: "linear-gradient(45deg, #FFD700, #ffcc00)",
              boxShadow: "0 4px 20px rgba(255,215,0,0.3)",
              color: "#000",
              border: "none",
              borderRadius: "10px",
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
              background: "rgba(7, 20, 46, 0.82)",
              padding: "18px",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
              minHeight: "180px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {result || "Your generated draft will appear here."}
          </div>
        </div>
      </div>
    </main>
  );
}
