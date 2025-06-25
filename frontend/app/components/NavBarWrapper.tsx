'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/NavBar"

export default function NavBarWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith('/login')) return null
  return <Navbar />
}