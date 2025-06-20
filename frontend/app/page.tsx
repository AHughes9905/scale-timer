'use client'
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const showBanner = (type: "error" | "success", message: string) => {
    setBanner({ type, message });
    setTimeout(() => setBanner(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          window.location.href = "/dashboard";
        } else {
          showBanner("error", "Login failed. Please check your credentials.");
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        showBanner("error", "An error occurred while logging in.");
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow">
      {banner && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm text-center ${
            banner.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {banner.message}
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
