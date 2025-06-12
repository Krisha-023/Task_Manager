import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";

export const TaskManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

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
      {showModal && (
        <TaskModal onSave={createTask} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
