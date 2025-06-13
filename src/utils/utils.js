import { AlertCircle, CheckCircle, Clock, Minus } from "lucide-react";
import { PRIORITY_OPTIONS } from "../components/constants";

export const getPriorityIcon = (priority) => {
  const priorityConfig = PRIORITY_OPTIONS.find((p) => p.value === priority);
  const IconComponent = priorityConfig?.icon || Minus;
  return <IconComponent className={`w-4 h-4 ${priorityConfig?.color}`} />;
};

export const getStatusIcon = (status) => {
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

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

