import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { STATUS_OPTIONS } from "./constants";

export const ChartView = ({ tasks }) => {
  const statusData = STATUS_OPTIONS.map(({ label, value }) => ({
    status: label,
    count: tasks.filter((task) => task.status === value).length,
  }));
  return (
    <div className="w-full flex justify-center">
      <BarChart width={500} height={300} data={statusData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3182CE" />
      </BarChart>
    </div>
  );
};
