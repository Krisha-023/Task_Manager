import React from "react";
import { TaskContextType } from "../types";

export const TaskContext = React.createContext<TaskContextType | undefined>(
  undefined
);

export const useTaskContext = (): TaskContextType => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};
