import React from "react";
import { Plus } from "lucide-react";
import { ViewOptions } from "./ViewOptions";
import { HeaderProps } from "../types";

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-8 w-full">
      <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
      <div className="flex-1 flex justify-center">
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
