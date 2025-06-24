'use client'

import NavBar from '@/components/NavBar';
import TimeLog from '@/types/time_log';

export default function AnalyticsPage() {

  const logs: TimeLog[] = [];
  fetch("http://localhost:8000/api/time/", {
    method: "GET",
    credentials: "include",
    
  }
).then(async (response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    const logs: TimeLog[] = await response.json();
  })

  return (
    <div className='p-8 sm:p-20'>
      <NavBar />
      <h1 className='text-3xl font-bold mt-20'>
        Analytics
      </h1>


    </div>
  )
}