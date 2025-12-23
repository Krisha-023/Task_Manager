import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { StatusOption, PriorityOption } from "../types";

export const STATUS_OPTIONS: StatusOption[] = [
  { value: "todo", label: "To Do", color: "bg-red-50 text-red-700" },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-blue-100 text-blue-800",
  },
  { value: "done", label: "Done", color: "bg-green-100 text-green-800" },
];

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: "low", label: "Low", color: "text-green-600", icon: ArrowDown },
  { value: "medium", label: "Medium", color: "text-yellow-600", icon: Minus },
  { value: "high", label: "High", color: "text-red-600", icon: ArrowUp },
];
