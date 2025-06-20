import React from "react";
import { TaskCard } from "./TaskCard";
import { formatDate } from "../utils/utils";
import { Task } from "../types";

interface TimeLineProps {
  tasks: Task[];
}

interface TimelineData {
  date: string;
  tasks: Task[];
}

interface TimelineItemProps {
  date: string;
  tasks: Task[];
}

export const TimeLine: React.FC<TimeLineProps> = ({ tasks }) => {
  const getTimelineData = (): TimelineData[] => {
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
    const grouped: Record<string, Task[]> = {};

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
        <TimelineItem key={date} date={date} tasks={tasks} />
      ))}
    </div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ date, tasks }) => (
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
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
