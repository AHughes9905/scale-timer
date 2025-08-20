'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-0 font-[var(--font-geist-sans)] bg-gradient-to-br from-blue-50 to-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-12 sm:py-16">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* Left: Welcome and Actions */}
          <section className="flex flex-col justify-center gap-8 bg-white/80 rounded-xl shadow-lg p-8 min-h-[340px]">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-700">Dashboard</h1>
            <p className="text-lg text-gray-700 mb-4">Welcome to your dashboard! Start practicing or view your analytics below.</p>
            <div className="flex gap-6 mt-2">
              <Link
                href="/scale-selector"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow"
              >
                Practice
              </Link>
              <Link
                href="/analytics"
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-900 font-semibold text-lg hover:bg-gray-300 transition shadow"
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