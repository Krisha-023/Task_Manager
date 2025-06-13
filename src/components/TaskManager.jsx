import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";
import { Filters } from "./Filters";
import { TaskCard } from "./TaskCard";

export const TaskManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

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

  return (
    <>
      <Header onCreateTask={() => setShowModal(true)} />
      <Filters
        searchTerm={search}
        setSearchTerm={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      {showModal && (
        <TaskModal
          handleSubmit={createTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
