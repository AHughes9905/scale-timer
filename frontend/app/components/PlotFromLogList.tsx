'user client'

import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label  } from 'recharts';
import TimeLog from '@/types/time_log';

type PlotFromLogListProps = {
  logs: TimeLog[]
};

export default function PlotFromLogList({ logs }: PlotFromLogListProps) {
  const formattedLogs = logs.map(log => ({
    ...log,
    duration: log.duration/100,
    created_at: new Date(log.created_at ?? '').toLocaleString(),
  }));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div className="h-[400px] bg-white border rounded shadow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedLogs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at">
                <Label value="Date" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis dataKey="duration">
                <Label value="Duration (seconds)" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="border rounded p-3 max-h-[400px] overflow-y-auto bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Logs</h2>
          <ul className="space-y-2">
            {formattedLogs.map((log, index) => (
              <li key={index} className="p-2 bg-white rounded shadow">
                <div className="grid grid-row justify-between">
                  <span>{log.created_at}</span>
                  <span>{log.duration} seconds</span>
                </div>
                <div className="text-sm text-gray-600">{log.scale_name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
  
}