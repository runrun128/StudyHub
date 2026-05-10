"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RankItem = {
  user_id: string;
  total_minutes: number;
};

export default function RankPage() {
  const [data, setData] = useState<RankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRank = async () => {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("user_id, minutes");

      if (error) {
        console.error(error);
        return;
      }

      // 集計（フロントでOK・まずはこれで十分）
      const map: Record<string, number> = {};

      data.forEach((row) => {
        map[row.user_id] = (map[row.user_id] || 0) + row.minutes;
      });

      const result: RankItem[] = Object.entries(map)
        .map(([user_id, total_minutes]) => ({
          user_id,
          total_minutes,
        }))
        .sort((a, b) => b.total_minutes - a.total_minutes);

      setData(result);
      setLoading(false);
    };

    fetchRank();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🏆 ランキング</h1>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.map((item, index) => (
            <div key={item.user_id} style={card}>
              <div style={{ fontSize: 18 }}>
                #{index + 1}
              </div>

              <div>
                ユーザー: {item.user_id.slice(0, 8)}...
              </div>

              <div style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.total_minutes} min
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 16,
  borderRadius: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};