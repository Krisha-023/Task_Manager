import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";
import { Filters } from "./Filters";

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
      {showModal && (
        <TaskModal onSave={createTask} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
