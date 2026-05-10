import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "あなたは勉強サポートAIです" },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();

    console.log("OPENAI RESPONSE:", data); // ←超重要

    const reply =
      data?.choices?.[0]?.message?.content ??
      data?.error?.message ??
      "エラー：応答なし";

    return NextResponse.json({ reply });

  } catch (e) {
    return NextResponse.json(
      { reply: "サーバーエラー" },
      { status: 500 }
    );
  }
}