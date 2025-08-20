'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-0 font-[var(--font-geist-sans)] bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-4 sm:px-8 sm:py-10">
        <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-12">
          <section className="flex flex-col justify-center items-center gap-8 bg-white rounded-2xl shadow-xl p-12 w-full min-h-[420px] max-w-2xl">
            <h1 className="text-5xl font-extrabold mb-2 text-gray-800">Dashboard</h1>
            <p className="text-xl text-gray-600 mb-4 text-center">Welcome to your dashboard! Start practicing or view your analytics below.</p>
            <div className="flex flex-col sm:flex-row gap-6 mt-2 w-full justify-center">
              <Link
                href="/scale-selector"
                className="flex-1 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-xl hover:bg-blue-700 transition shadow text-center"
              >
                Practice
              </Link>
              <Link
                href="/analytics"
                className="flex-1 px-8 py-4 rounded-xl bg-gray-200 text-gray-900 font-semibold text-xl hover:bg-gray-300 transition shadow text-center"
              >
                View Analytics
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}