"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FriendsPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // 初期ロード
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) return;

      const user = data.user;
      setUser(user);
      fetchRequests(user.id);
    };

    load();
  }, []);

  // 申請一覧取得
  const fetchRequests = async (userId: string) => {
    const { data } = await supabase
      .from("friend_requests")
      .select("*, profiles:from_user(nickname, avatar_url)")
      .eq("to_user", userId)
      .eq("status", "pending");

    setRequests(data || []);
  };

  // ユーザー検索
  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value) {
      setResults([]);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .ilike("nickname", `%${value}%`);

    setResults(data || []);
  };

  // 申請送信
  const sendRequest = async (toUserId: string) => {
    if (!user) return;
    await supabase.from("friend_requests").insert({
      from_user: user.id,
      to_user: toUserId,
      status: "pending",
    });

    alert("申請送信");
  };

  // 承認
  const acceptRequest = async (req: any) => {
    if (!user) return;
    await supabase
      .from("friend_requests")
      .update({ status: "accepted" })
      .eq("id", req.id);

    await supabase.from("friends").insert([
      { user_id: req.to_user, friend_id: req.from_user },
      { user_id: req.from_user, friend_id: req.to_user },
    ]);

    fetchRequests(user.id);
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>👥 フレンド</h1>

      {/* 🔍 検索 */}
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="ニックネーム検索"
        style={input}
      />

      {/* 検索結果 */}
      <div style={{ marginTop: 20 }}>
        {results.map((u) => (
          <div key={u.id} style={card}>
            <div style={row}>
              <img
                src={u.avatar_url || "/default.png"}
                style={avatar}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold" }}>{u.nickname}</div>
              </div>

              <button
                onClick={() => sendRequest(u.id)}
                style={button}
              >
                申請
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📥 受信申請 */}
      <h2 style={{ marginTop: 30 }}>📥 フレンド申請</h2>

      {requests.length === 0 && (
        <p style={{ opacity: 0.6 }}>申請なし</p>
      )}

      {requests.map((r) => (
        <div key={r.id} style={card}>
          <div style={row}>
            <img
              src={r.profiles?.avatar_url || "/default.png"}
              style={avatar}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>
                {r.profiles?.nickname}
              </div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                フレンド申請
              </div>
            </div>

            <button
              onClick={() => acceptRequest(r)}
              style={acceptButton}
            >
              承認
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
};

const row = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const avatar: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 6, // ← 正方形＋角丸
  objectFit: "cover" as React.CSSProperties["objectFit"],
  background: "#1f2937",
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #333",
  background: "#0f172a",
  color: "white",
};

const button = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 8,
  cursor: "pointer",
};

const acceptButton = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 8,
  cursor: "pointer",
};