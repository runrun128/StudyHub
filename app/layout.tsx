import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#0b1220", color: "white" }}>
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
            <h2 style={{ fontSize: 18, marginBottom: 24 }}>📚 StudyHub</h2>

            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/" style={link}>ホーム</Link>
              <Link href="/study" style={link}>学習記録</Link>
              <Link href="/rank" style={link}>ランキング</Link>
              <Link href="/friends" style={link}>フレンド</Link>
              <Link href="/ai" style={link}>AI(開発中)</Link>
            </nav>
          </aside>

          {/* メイン */}
          <main style={{ flex: 1, padding: 30 }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}

const link = {
  color: "#cbd5e1",
  textDecoration: "none",
  padding: "6px 10px",
  borderRadius: 6,
};