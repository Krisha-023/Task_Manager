import { Plus } from "lucide-react";
import { ViewOptions } from "./ViewOptions";

export const Header = ({ onCreateTask }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <ViewOptions />
      </div>
      <button
        onClick={onCreateTask}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Create Task
      </button>
    </div>
  );
};
