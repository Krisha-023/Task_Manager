import { getPriorityIcon, getStatusIcon } from "../utils/utils";
import { STATUS_OPTIONS } from "./constants";
import { Edit2, Trash2, User, Calendar } from "lucide-react";
import { useTaskContext } from "../context/context";

export const TaskCard = ({ task, compact = false }) => {
  const statusConfig = STATUS_OPTIONS.find((s) => s.value === task.status);

  if (compact) {
    return (
      <div className="bg-white rounded border border-gray-200 p-2 mb-1 text-xs hover:shadow-sm transition-shadow">
        <div className="flex justify-between items-start">
          <span className="font-medium text-gray-900 truncate flex-1">
            {task.title}
          </span>
          <TaskActions task={task} compact />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`px-1 py-0.5 rounded text-xs ${statusConfig?.color}`}
          >
            {statusConfig?.label}
          </span>
          <div className="flex items-center gap-1">
            {getPriorityIcon(task.priority)}
            <span className="text-gray-500">{task.priority}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
        <TaskActions task={task} />
      </div>

      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <TaskData task={task} statusConfig={statusConfig} />
    </div>
  );
};

const TaskActions = ({ task, compact = false }) => {
  const { onEdit, onDelete } = useTaskContext();
  const iconSize = compact ? "w-3 h-3" : "w-4 h-4";
  const buttonClass = compact ? "text-gray-400 p-1" : "text-gray-400";

  return (
    <div className="flex gap-2 ml-2">
      <button
        onClick={() => onEdit(task)}
        className={`${buttonClass} hover:text-blue-600 transition-colors`}
      >
        <Edit2 className={iconSize} />
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className={`${buttonClass} hover:text-red-600 transition-colors`}
      >
        <Trash2 className={iconSize} />
      </button>
    </div>
  );
};

const TaskData = ({ task, statusConfig }) => (
  <div className="flex items-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      {getStatusIcon(task.status)}
      <span className={`px-2 py-1 rounded-full text-xs ${statusConfig?.color}`}>
        {statusConfig?.label}
      </span>
    </div>

    <div className="flex items-center gap-1">
      {getPriorityIcon(task.priority)}
      <span className="text-gray-600 capitalize">{task.priority}</span>
    </div>

    <div className="flex items-center gap-1 text-gray-500">
      <User className="w-4 h-4" />
      <span>{task.owner}</span>
    </div>

    <div className="flex items-center gap-1 text-gray-500">
      <Calendar className="w-4 h-4" />
      <span>{task.deadline}</span>
    </div>
  </div>
);
