"use client";

import { useEffect, useState } from "react";

type UserRank = {
  name: string;
  total: number;
};

export default function RankPage() {
  const [data, setData] = useState<UserRank[]>([]);

  useEffect(() => {
    const mock: UserRank[] = [
      { name: "You", total: 320 },
      { name: "Taro", total: 280 },
      { name: "Hanako", total: 250 },
      { name: "Ken", total: 180 },
    ];

    mock.sort((a, b) => b.total - a.total);
    setData(mock);
  }, []);

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🏆 Ranking</h1>

      <div style={list}>
        {data.map((u, i) => (
          <div key={i} style={item}>
            
            {/* 左：順位 */}
            <div style={left}>
              <span style={rank}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
              </span>

              <span style={name}>{u.name}</span>
            </div>

            {/* 右：時間 */}
            <div style={time}>
              {u.total} min
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 12,
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  borderRadius: 12,
  background: "#111827",
  color: "white",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const rank = {
  fontSize: 18,
  width: 30,
};

const name = {
  fontSize: 16,
};

const time = {
  opacity: 0.8,
};