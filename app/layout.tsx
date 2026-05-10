"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const isAdmin =
        typeof window !== "undefined" &&
        localStorage.getItem("isAdmin") === "true";

      const publicPaths = ["/login", "/signup"];

      // 未ログイン & 管理者でもない & 公開ページでもない
      if (!user && !isAdmin && !publicPaths.includes(pathname)) {
        router.push("/login");
        return;
      }

      // ログイン済み or 管理者なのに login/signup にいる場合
      if ((user || isAdmin) && publicPaths.includes(pathname)) {
        router.push(isAdmin ? "/admin" : "/");
        return;
      }

      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const showSidebar =
    pathname !== "/login" && pathname !== "/signup";

  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          background: "#0b1220",
          color: "white",
        }}
      >
        {loading ? (
          <div style={{ padding: 20 }}>Loading...</div>
        ) : showSidebar ? (
          <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* サイドバー */}
            <aside
              style={{
                width: 240,
                background: "#0f172a",
                padding: 20,
                borderRight: "1px solid #1f2937",
              }}
            >
              <h2 style={{ fontSize: 18, marginBottom: 24 }}>
                📚 StudyHub
              </h2>

              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Link href="/" style={link}>
                  ホーム
                </Link>

                <Link href="/study" style={link}>
                  学習記録
                </Link>

                <Link href="/rank" style={link}>
                  ランキング
                </Link>

                <Link href="/friends" style={link}>
                  フレンド
                </Link>

                <Link href="/ai" style={link}>
                  AI（開発中）
                </Link>

                {typeof window !== "undefined" &&
                  localStorage.getItem("isAdmin") === "true" && (
                    <Link href="/admin" style={link}>
                      管理者
                    </Link>
                  )}

                <button
                  onClick={async () => {
                    localStorage.removeItem("isAdmin");
                    await supabase.auth.signOut();
                    router.push("/login");
                  }}
                  style={logoutButton}
                >
                  ログアウト
                </button>
              </nav>
            </aside>

            {/* メイン */}
            <main style={{ flex: 1, padding: 30 }}>
              {children}
            </main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}

const link = {
  color: "#cbd5e1",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 8,
  transition: "0.2s",
};

const logoutButton = {
  color: "#f87171",
  background: "transparent",
  border: "1px solid #334155",
  textAlign: "left" as const,
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
};