"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState("");

  // 📥 読み込み
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("load:", data, error);

      if (data) {
        setNickname(data.nickname || "");
        setBio(data.bio || "");
        setBirthday(data.birthday || "");
        setAvatar(data.avatar_url || "");
      }
    };

    load();
  }, []);

  // 💾 保存
  const save = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてない");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          nickname,
          bio,
          birthday,
          avatar_url: avatar,
        },
        { onConflict: "id" }
      );

    console.log("save error:", error);

    if (error) {
      alert("保存失敗");
    } else {
      alert("保存した");
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h1>👤 プロフィール</h1>

      {/* アイコンURL */}
      <div>
        <p>アイコンURL</p>
        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          style={input}
        />
      </div>

      {/* ニックネーム */}
      <div>
        <p>ニックネーム</p>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={input}
        />
      </div>

      {/* 自己紹介 */}
      <div>
        <p>自己紹介</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ ...input, height: 80 }}
        />
      </div>

      {/* 誕生日 */}
      <div>
        <p>誕生日</p>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          style={input}
        />
      </div>

      <button onClick={save} style={button}>
        保存
      </button>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  background: "#111827",
  color: "white",
  border: "1px solid #333",
  borderRadius: 8,
};

const button = {
  padding: "10px 16px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};