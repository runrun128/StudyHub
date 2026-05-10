"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const data = localStorage.getItem("study");
    if (data) setSessions(JSON.parse(data));
  }, []);

  const save = (data: Session[]) => {
    setSessions(data);
    localStorage.setItem("study", JSON.stringify(data));
  };

  const add = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      subject,
      minutes,
    };

    save([...sessions, newSession]);
  };

  const total = sessions.reduce((a, b) => a + b.minutes, 0);

  return (
    <div style={{ maxWidth: 700 }}>

      <h1 style={{ fontSize: 28, marginBottom: 20 }}>📚 Study Dashboard</h1>

      {/* 入力カード */}
      <div style={card}>

        {/* 教科選択 */}
        <div>
          <p>教科</p>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* ダイヤル（スライダー） */}
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

      </div>

      {/* 合計 */}
      <div style={card}>
        <h2>合計: {total}分</h2>
      </div>

      {/* リスト */}
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
};