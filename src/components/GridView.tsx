import React from "react";
import { useTaskContext } from "../context/context";
import { TaskCard } from "./TaskCard";
import { ViewProps } from "../types";

export const GridView: React.FC<ViewProps> = ({ tasks }) => {
  const { onDelete, handleEditClick } = useTaskContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEditClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
