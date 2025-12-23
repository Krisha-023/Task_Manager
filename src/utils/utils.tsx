import React from "react";
import { AlertCircle, CheckCircle, Clock, Minus } from "lucide-react";
import { PRIORITY_OPTIONS } from "../components/constants";
import { TaskPriority, TaskStatus } from "../types";

export const getPriorityIcon = (priority: TaskPriority): React.ReactElement => {
  const priorityConfig = PRIORITY_OPTIONS.find((p) => p.value === priority);
  const IconComponent = priorityConfig?.icon || Minus;
  return <IconComponent className={`w-4 h-4 ${priorityConfig?.color}`} />;
};

export const getStatusIcon = (status: TaskStatus): React.ReactElement => {
  switch (status) {
    case "todo":
      return <Clock className="w-4 h-4" />;
    case "in-progress":
      return <AlertCircle className="w-4 h-4" />;
    case "done":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
