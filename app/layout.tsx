import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>

          {/* サイドバー */}
          <aside style={{ width: 200, padding: 20, background: "#111" }}>
            <p style={{ color: "white", marginBottom: 20 }}>StudyHub</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/" style={{ color: "white" }}>ホーム</Link>
              <Link href="/study" style={{ color: "white" }}>勉強</Link>
              <Link href="/friends" style={{ color: "white" }}>フレンド</Link>
              <Link href="/rank" style={{ color: "white" }}>ランキング</Link>
              <Link href="/ai" style={{ color: "white" }}>AI</Link>
            </div>
          </aside>

          {/* メイン */}
          <main style={{ flex: 1, padding: 20 }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}