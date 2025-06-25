'user client'

import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer  } from 'recharts';
import TimeLog from '@/types/time_log';

type PlotFromLogListProps = {
  logs: TimeLog[]
};

export default function PlotFromLogList({ logs }: PlotFromLogListProps) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4"> Graph </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[400px] bg-white border rounded shadow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={logs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" />
              <YAxis dataKey="duration"/>
              <Tooltip />
              <Line type="monotone" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
  
}