"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signIn = async () => {
    setMessage("");

    // 管理者用の簡易ログイン
    if (email === "root" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("ログイン失敗: " + error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div style={container}>
      <h1 style={{ marginBottom: 24 }}>ログイン</h1>

      <input
        type="text"
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

      <button onClick={signIn} style={button} disabled={loading}>
        {loading ? "ログイン中..." : "ログイン"}
      </button>

      {message && (
        <p
          style={{
            marginTop: 16,
            color: "#fca5a5",
            fontSize: 14,
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: 20, opacity: 0.8 }}>
        アカウントをお持ちでない方は <Link href="/signup">新規登録</Link>
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
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
  fontWeight: "bold" as const,
};