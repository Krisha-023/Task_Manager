import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "./constants";
import { Task } from "../types";

interface ChartViewProps {
  tasks: Task[];
}

interface ChartData {
  status: string;
  count: number;
}

interface PriorityChartData extends ChartData {
  color: string;
}

const tailwindTextToHex: Record<string, string> = {
  "text-green-600": "#16A34A",
  "text-yellow-600": "#CA8A04",
  "text-red-600": "#DC2626",
};

export const ChartView: React.FC<ChartViewProps> = ({ tasks }) => {
  const statusData: ChartData[] = STATUS_OPTIONS.map(({ label, value }) => ({
    status: label,
    count: tasks.filter((task) => task.status === value).length,
  }));

  const priorityData: PriorityChartData[] = PRIORITY_OPTIONS.map(
    ({ value, label, color }) => ({
      status: label,
      count: tasks.filter((task) => task.priority === value).length,
      color: tailwindTextToHex[color] || "#3182CE",
    })
  );

  return (
    <div className="w-full flex flex-wrap justify-center gap-12">
      <div className="w-full md:w-1/2 h-[300px]">
        <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">
          Tasks by Status
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              type="category"
              interval={0}
              domain={["done", "in-progress", "todo"]}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-1/2 h-[300px]">
        <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">
          Tasks by Priority
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
