"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold">StudyHub</h1>

      {user ? (
        <div className="mt-6 text-center">
          <p className="text-lg">こんにちは 👋</p>
          <p className="font-bold">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div className="mt-6 flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            ログイン
          </Link>

          <Link
            href="/signup"
            className="px-6 py-3 bg-green-600 text-white rounded-xl"
          >
            新規登録
          </Link>
        </div>
      )}
    </main>
  );
}