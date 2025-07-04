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

export const TaskManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentView, setCurrentView] = useState("grid");
  const [editingTask, setEditingTask] = useState(null);

  const createTask = (taskData) => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
    };
    setTasks([...tasks, newTask]);
    setShowCreateModal(false);
  };

  const onEdit = (id, updatedData) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
    setShowUpdateModal(false);
    setEditingTask(null);
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowUpdateModal(true);
  };

  const contextValue = {
    currentView,
    setCurrentView,
    tasks,
    setTasks,
    onEdit,
    onDelete,
    createTask,
    handleEditClick,
  };

  const renderView = (currentView) => {
    switch (currentView) {
      case "grid":
        return <GridView tasks={filteredTasks} />;
      case "calendar":
        return (
          <CalendarView
            tasks={filteredTasks}
            onEdit={onEdit}
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
        {showCreateModal ? (
          <TaskModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={createTask}
          />
        ) : null}
        {showUpdateModal ? (
          <TaskModal
            task={editingTask}
            onClose={() => {
              setShowUpdateModal(false);
              setEditingTask(null);
            }}
          />
        ) : null}
      </div>
    </TaskContext.Provider>
  );
};
