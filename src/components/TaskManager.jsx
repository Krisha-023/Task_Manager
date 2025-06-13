import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";
import { Filters } from "./Filters";
import { TaskCard } from "./TaskCard";
import { TaskContext } from "../context/context";

export const TaskManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentView, setCurrentView] = useState("grid");

  const createTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      created: new Date().toISOString().split("T")[0],
    };
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  const onEdit = (id, updatedData) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const contextValue = {
    currentView,
    setCurrentView,
    tasks,
    setTasks,
    onEdit,
    onDelete,
    createTask,
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
      <Header onCreateTask={() => setShowModal(true)} />
      <Filters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </TaskContext.Provider>
  );
};
