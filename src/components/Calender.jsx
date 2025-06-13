import { useState } from "react";
import { TaskCard } from "./TaskCard";

export const CalendarView = ({ tasks, onEdit, onDelete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getTasksForDate = (date) => {
    if (!date) return [];
    const dateStr =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    return tasks.filter((task) => task.deadline === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <CalendarHeader
        currentDate={currentDate}
        monthNames={monthNames}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            tasks={getTasksForDate(day)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const CalendarHeader = ({
  currentDate,
  monthNames,
  onPrevMonth,
  onNextMonth,
}) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <button
      onClick={onPrevMonth}
      className="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
    >
      ←
    </button>
    <h2 className="text-xl font-semibold">
      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
    </h2>
    <button
      onClick={onNextMonth}
      className="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
    >
      →
    </button>
  </div>
);

const CalendarDay = ({ day, tasks, onEdit, onDelete }) => (
  <div className="bg-white p-1 min-h-24 border-r border-b border-gray-100">
    {day && (
      <>
        <div className="text-sm font-medium text-gray-900 mb-1">
          {day.getDate()}
        </div>
        <div className="space-y-1">
          {tasks.slice(0, 3).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              compact={true}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {tasks.length > 3 && (
            <div className="text-xs text-gray-500 text-center">
              +{tasks.length - 3} more
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
