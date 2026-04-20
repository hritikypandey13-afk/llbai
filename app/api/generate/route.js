import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing in environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are LLBAI, an expert Indian legal drafting assistant. Draft in formal, professional, practical legal language. Structure the answer clearly and make it usable as a first draft.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "OpenAI request failed. Please check API key and billing.",
        },
        { status: response.status }
      );
    }

    const result = data?.choices?.[0]?.message?.content;

    return NextResponse.json({
      result: result || "No response generated.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong while generating the draft.",
      },
      { status: 500 }
    );
  }
}
