"use client";

import { useState } from "react";

type Friend = {
  id: string;
  name: string;
};

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Taro" },
    { id: "2", name: "Hanako" },
  ]);

  const [input, setInput] = useState("");

  const addFriend = () => {
    if (!input) return;

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: input,
    };

    setFriends([...friends, newFriend]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>👥 Friends</h1>

      {/* 追加フォーム */}
      <div style={box}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="フレンド名"
          style={inputStyle}
        />

        <button onClick={addFriend} style={btn}>
          追加
        </button>
      </div>

      {/* リスト */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {friends.map((f) => (
          <div key={f.id} style={item}>
            👤 {f.name}
          </div>
        ))}
      </div>
    </div>
  );
}

const box = {
  display: "flex",
  gap: 10,
};

const inputStyle = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px 14px",
  borderRadius: 8,
  background: "#3b82f6",
  color: "white",
  border: "none",
};

const item = {
  padding: 14,
  borderRadius: 12,
  background: "#111827",
  color: "white",
};