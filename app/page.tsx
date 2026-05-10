"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [todayTotal, setTodayTotal] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("study");
    if (!data) return;

    const sessions = JSON.parse(data);

    const total = sessions.reduce(
      (sum: number, s: any) => sum + s.minutes,
      0
    );

    setTodayTotal(total);
  }, []);

  const items = [
    { label: "⏱ Study", path: "/study" },
    { label: "🏆 Rank", path: "/rank" },
    { label: "👥 Friends", path: "/friends" },
    { label: "🤖 AI", path: "/ai" },
  ];

  return (
    <div style={{ maxWidth: 800 }}>

      {/* タイトル */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: 32 }}>📚 StudyHub</h1>
        <p style={{ opacity: 0.7 }}>今日の学習を記録しよう</p>
      </motion.div>

      {/* Today（連動部分） */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={card}
      >
        <h2>🔥 Today</h2>
        <p style={{ fontSize: 24 }}>{todayTotal} min</p>
      </motion.div>

      {/* グリッド */}
      <div style={grid}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={smallCard}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </motion.div>
        ))}
      </div>

    </div>
  );
}

const card = {
  background: "#111827",
  padding: 20,
  borderRadius: 16,
  marginBottom: 20,
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const smallCard = {
  background: "#1f2937",
  padding: 18,
  borderRadius: 14,
  color: "white",
  cursor: "pointer",
};