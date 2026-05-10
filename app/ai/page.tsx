"use client";

import { useState } from "react";

export default function AI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const send = async () => {
    if (!input) return;

    setMessages((prev) => [...prev, "あなた: " + input]);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, "AI: " + data.reply]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AIチャット</h1>

      <div style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問してみて"
        />

        <button onClick={send}>送信</button>
      </div>
    </div>
  );
}