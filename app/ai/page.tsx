"use client";

import { useState } from "react";

export default function AI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const send = () => {
    if (!input) return;

    setMessages([...messages, "あなた: " + input]);
    setInput("");

    // 仮AI応答
    setTimeout(() => {
      setMessages((prev) => [...prev, "AI: まだ開発中だよ"]);
    }, 500);
  };

  return (
    <div>
      <h1>AIアシスタント</h1>

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