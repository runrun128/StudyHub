"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Session = {
  id: string;
  subject: string;
  minutes: number;
};

const subjects = ["数学", "英語", "理科", "社会", "その他"];

export default function StudyPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subject, setSubject] = useState(subjects[0]);
  const [minutes, setMinutes] = useState(30);
  const [message, setMessage] = useState("");

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from("study_sessions")
      .select("id, subject, minutes")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSessions(data);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const add = async () => {
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("ログインしてください。");
      return;
    }

    const { error } = await supabase.from("study_sessions").insert({
      user_id: user.id,
      subject,
      minutes,
    });

    if (error) {
      setMessage("保存に失敗しました: " + error.message);
      return;
    }

    setMessage("保存しました！🎉");
    fetchSessions();
  };

  const total = sessions.reduce((a, b) => a + b.minutes, 0);

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>📚 Study Dashboard</h1>

      <div style={card}>
        <div>
          <p>教科</p>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 20 }}>
          <p>時間: {minutes}分</p>
          <input
            type="range"
            min="5"
            max="180"
            step="5"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <button onClick={add} style={btn}>
          追加
        </button>

        {message && (
          <p style={{ marginTop: 12, opacity: 0.8 }}>
            {message}
          </p>
        )}
      </div>

      <div style={card}>
        <h2>合計: {total}分</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sessions.map((s) => (
          <div key={s.id} style={item}>
            <b>{s.subject}</b> - {s.minutes}分
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 16,
  borderRadius: 12,
  marginBottom: 16,
};

const item = {
  padding: 12,
  background: "#1f2937",
  borderRadius: 10,
};

const btn = {
  marginTop: 20,
  width: "100%",
  padding: 10,
  borderRadius: 10,
  background: "#3b82f6",
  color: "white",
  border: "none",
  cursor: "pointer",
};