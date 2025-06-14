import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const TaskStatus = ({ tasks }) => {
  const status = [
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "text-gray-900",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: AlertCircle,
    },
    {
      label: "To Do",
      value: tasks.filter((t) => t.status === "todo").length,
      color: "text-gray-900",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
      icon: Clock,
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: AlertCircle,
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      color: "text-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {status.map((status, index) => (
        <StatCard key={index} status={status} />
      ))}
    </div>
  );
};

const StatCard = ({ status }) => {
  const IconComponent = status.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{status.label}</p>
          <p className={`text-2xl font-bold ${status.color}`}>{status.value}</p>
        </div>
        <div
          className={`w-8 h-8 ${status.bgColor} rounded-full flex items-center justify-center`}
        >
          <IconComponent className={`w-5 h-5 ${status.iconColor}`} />
        </div>
      </div>
    </div>
  );
};
