'use client'
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const showBanner = (type: "error" | "success", message: string) => {
    setBanner({ type, message });
    setTimeout(() => setBanner(null), 3000);
  };

  const demoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", "demoUsername");
    formData.append("password", "demoPassword");

    fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          window.location.href = "/";
        } else {
          showBanner("error", "Login failed.");
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        showBanner("error", "An error occurred while logging in.");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          window.location.href = "/";
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        alert("An error occurred while logging in.");
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 w-full max-w-5xl items-center">
        <h1 className="text-4xl font-bold text-center mb-6 col-span-full">
          Guitar Scale Timer
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <div className="bg-gray-100 flex items-center justify-center max-w-2xl w-[500px] min-h-[180px] mx-auto rounded shadow-lg">
            <p className="text-gray-600 text-2xl p-12">
              Practice your guitar scales and track your progress. Login or register to continue.
            </p>
          </div>
          <button
            type="button"
            onClick={demoLogin}
            className="w-full max-w-lg bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition shadow"
          >
            Demo User Login
          </button>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-sm mx-auto p-6 bg-white rounded shadow">
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
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = "/register"}
                  className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
