"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1>🛠 管理者ページ</h1>
      <p>ここではユーザー管理やお知らせ投稿ができます。</p>
    </div>
  );
}