export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">ログイン</h1>

        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="パスワード"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          ログイン
        </button>
      </div>
    </main>
  );
}