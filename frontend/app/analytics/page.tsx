'use client'

import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import TimeLog from '@/types/time_log';
import PlotFromLogList from '@/components/PlotFromLogList';

export default function AnalyticsPage() {
  const [logs, setLogs] = useState<TimeLog[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/time/", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data: TimeLog[] = await response.json();
        setLogs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='p-4 sm:p-10'>
      <NavBar />
      <h1 className='text-3xl font-bold mt-20'>
        Analytics
      </h1>
      <PlotFromLogList logs={logs} />
    </div>
  );
}