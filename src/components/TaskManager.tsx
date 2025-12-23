import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";
import { Filters } from "./Filters";
import { TaskContext } from "../context/context";
import { CalendarView } from "./Calender";
import { TimeLine } from "./TimeLine";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { ChartView } from "./ChartView";
import { CardView } from "./Card";
import { TaskStatus } from "./TaskStatus";
import { Task, ViewType, TaskContextType } from "../types";

export const TaskManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentView, setCurrentView] = useState<ViewType>("grid");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const createTask = (taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowCreateModal(false);
  };

  // Helper function that can handle both create and update scenarios
  const handleModalSubmit = (taskData: Omit<Task, "id"> | Partial<Task>) => {
    if (editingTask) {
      // Update scenario
      onEdit(editingTask.id, taskData as Partial<Task>);
    } else {
      // Create scenario
      createTask(taskData as Omit<Task, "id">);
    }
  };

  const onEdit = (id: string, updatedData: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
    setShowUpdateModal(false);
    setEditingTask(null);
  };

  const onDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowUpdateModal(true);
  };

  // Helper function to handle onEdit for calendar view (which expects a Task object)
  const handleCalendarEdit = (task: Task) => {
    setEditingTask(task);
    setShowUpdateModal(true);
  };

  const contextValue: TaskContextType = {
    currentView,
    setCurrentView,
    tasks,
    setTasks,
    onEdit,
    onDelete,
    createTask,
    handleEditClick,
  };

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      search === "" || task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const renderView = (view: ViewType) => {
    switch (view) {
      case "grid":
        return (
          <GridView tasks={filteredTasks} onEdit={onEdit} onDelete={onDelete} />
        );
      case "calendar":
        return (
          <CalendarView
            tasks={filteredTasks}
            onEdit={handleCalendarEdit}
            onDelete={onDelete}
          />
        );
      case "timeline":
        return <TimeLine tasks={filteredTasks} />;
      case "list":
        return <ListView tasks={filteredTasks} />;
      case "chart":
        return <ChartView tasks={filteredTasks} />;
      case "card":
        return <CardView tasks={filteredTasks} />;
      default:
        return null;
    }
  };

  return (
    <TaskContext.Provider value={contextValue}>
      <div className="max-w-7xl mx-auto px-2">
        <Header onCreateTask={() => setShowCreateModal(true)} />
        <Filters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <TaskStatus tasks={filteredTasks} />
        {renderView(currentView)}
        {showCreateModal && (
          <TaskModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleModalSubmit}
          />
        )}
        {showUpdateModal && editingTask && (
          <TaskModal
            task={editingTask}
            onClose={() => {
              setShowUpdateModal(false);
              setEditingTask(null);
            }}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
};
