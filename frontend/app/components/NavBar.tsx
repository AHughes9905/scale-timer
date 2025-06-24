import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-100 shadow mb-8">
      <Link href="/dashboard" className="font-bold text-xl">Scale Timer</Link>
      <div className="flex gap-6">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link
          href="/"
          className="hover:underline text-red-600"
          onClick={() => {
            // Clear the cookie to log out
            fetch("http://localhost:8000/api/auth/logout", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}