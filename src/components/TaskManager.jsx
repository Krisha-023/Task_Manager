import { Header } from "./Header";
import { useState } from "react";

export const TaskManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  return <Header onCreateTask={() => setShowCreateModal(true)} />;
};
