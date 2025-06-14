import { STATUS_OPTIONS } from "./constants";
import { TaskCard } from "./TaskCard";

export const KanbanView = ({ tasks }) => {
  return (
    <div className="flex gap-4">
      {STATUS_OPTIONS.map(({ value, label, color }) => (
        <div
          key={value}
          className={`flex-1 p-4 rounded ${color.split(" ")[0]}`}
        >
          <h2 className={`text-lg font-bold mb-2 ${color.split(" ")[1]}`}>
            {label}
          </h2>
          {tasks
            .filter((task) => task.status === value)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};
