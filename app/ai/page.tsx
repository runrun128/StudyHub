"use client";

import { useState } from "react";

type Msg = {
  role: "user" | "ai";
  text: string;
};

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const send = async () => {
    if (!input) return;

    const userMsg: Msg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiMsg: Msg = { role: "ai", text: data.reply };
    setMessages((prev) => [...prev, aiMsg]);

    setInput("");
  };

  return (
    <div style={wrap}>

      {/* メッセージ */}
      <div style={chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...bubble,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#3b82f6" : "#1f2937",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* 入力 */}
      <div style={inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問してみて"
          style={inputStyle}
        />
        <button onClick={send} style={btn}>
          送信
        </button>
      </div>

    </div>
  );
}

const wrap = {
  display: "flex",
  flexDirection: "column" as const,
  height: "80vh",
};

const chat = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
  overflowY: "auto",
  padding: 10,
};

const bubble = {
  maxWidth: "70%",
  padding: "10px 14px",
  borderRadius: 16,
  color: "white",
};

const inputBox = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const inputStyle = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "#3b82f6",
  color: "white",
  border: "none",
};