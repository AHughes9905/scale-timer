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
            <div className="mt-8 flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Tip: Track your progress and improve your speed every day!</span>
            </div>
          </section>
          {/* Right: Summary Card */}
          <section className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg p-8 min-h-[340px]">
            <div className="w-full flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center mb-4 shadow-lg">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Your Practice Summary</h2>
              <ul className="text-gray-700 text-lg space-y-1">
                <li><span className="font-semibold">Sessions:</span> <span className="text-blue-700">--</span></li>
                <li><span className="font-semibold">Best Time:</span> <span className="text-blue-700">--</span></li>
                <li><span className="font-semibold">Favorite Scale:</span> <span className="text-blue-700">--</span></li>
              </ul>
              <span className="text-xs text-gray-400 mt-4">(Analytics coming soon!)</span>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-6 bg-white/70 border-t">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </footer>
    </div>
  );
}