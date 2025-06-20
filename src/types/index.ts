import { LucideIcon } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  owner: string;
  deadline: string;
}

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type ViewType =
  | "grid"
  | "calendar"
  | "timeline"
  | "list"
  | "chart"
  | "card";

export interface StatusOption {
  value: TaskStatus;
  label: string;
  color: string;
}

export interface PriorityOption {
  value: TaskPriority;
  label: string;
  color: string;
  icon: LucideIcon;
}

export interface TaskContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onEdit: (id: string, updatedData: Partial<Task>) => void;
  onDelete: (id: string) => void;
  createTask: (taskData: Omit<Task, "id">) => void;
  handleEditClick: (task: Task) => void;
}

export interface TaskModalProps {
  task?: Task;
  onClose: () => void;
  onSubmit?: (taskData: Omit<Task, "id"> | Partial<Task>) => void;
}

export interface FilterProps {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
}

export interface ViewProps {
  tasks: Task[];
  onEdit?: (id: string, updatedData: Partial<Task>) => void;
  onDelete?: (id: string) => void;
}

export interface FormProps {
  label: string;
  type: "text" | "textarea" | "select" | "date";
  value: string;
  onChange: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface HeaderProps {
  onCreateTask: () => void;
}

export interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export interface TaskStatusProps {
  tasks: Task[];
}
