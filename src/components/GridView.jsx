import { useTaskContext } from "../context/context";
import { TaskCard } from "./TaskCard";

export const GridView = ({ tasks }) => {
  const { onEdit, onDelete } = useTaskContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
