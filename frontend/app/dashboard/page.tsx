'use client'

import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard!</p>
        <div className="flex gap-6 mt-4">
          <Link
            href="/scale-selector"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Practice
          </Link>
          <Link
            href="/analytics"
            className="px-4 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
          >
            View Analytics
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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