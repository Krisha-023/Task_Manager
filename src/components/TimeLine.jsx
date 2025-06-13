import { TaskCard } from "./TaskCard";
import { formatDate } from "../utils/utils";
import { useTaskContext } from "../context/context";

export const TimeLine = ({ tasks }) => {
  const { onEdit, onDelete } = useTaskContext();
  const getTimelineData = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
    const grouped = {};

    sortedTasks.forEach((task) => {
      const date = task.deadline;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });

    return Object.entries(grouped).map(([date, tasks]) => ({ date, tasks }));
  };

  const timelineData = getTimelineData();

  if (timelineData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timelineData.map(({ date, tasks }) => (
        <TimelineItem
          key={date}
          date={date}
          tasks={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const TimelineItem = ({ date, tasks, onEdit, onDelete }) => (
  <div className="relative">
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {formatDate(date)}
          </h3>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
