"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    if (password.length < 6) {
      alert("パスワードは6文字以上にしてください");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("登録失敗: " + error.message);
    } else {
      alert("登録成功！");
    }
  };

  return (
    <div style={container}>
      <h1>新規登録</h1>

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="パスワード（確認）"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={input}
      />

      <button onClick={signUp} style={button}>
        新規登録
      </button>

      <p style={{ marginTop: 20 }}>
        すでにアカウントをお持ちの方は{" "}
        <Link href="/login">ログイン</Link>
      </p>
    </div>
  );
}

const container = {
  maxWidth: 400,
  margin: "100px auto",
  padding: 30,
  background: "#111827",
  borderRadius: 16,
  color: "white",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #374151",
  background: "#1f2937",
  color: "white",
  boxSizing: "border-box" as const,
};

const button = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};