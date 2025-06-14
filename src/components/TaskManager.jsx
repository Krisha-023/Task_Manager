import { Header } from "./Header";
import { useState } from "react";
import { TaskModal } from "./TaskModal";
import { Filters } from "./Filters";
import { TaskContext } from "../context/context";
import { CalendarView } from "./Calender";
import { TimeLine } from "./TimeLine";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { ChartView } from "./ChartView";
import { KanbanView } from "./Kanban";

export const TaskManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentView, setCurrentView] = useState("grid");
  const [editingTask, setEditingTask] = useState(null);

  const createTask = (taskData) => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
      created: new Date().toISOString().split("T")[0],
    };
    setTasks([...tasks, newTask]);
    setShowCreateModal(false);
  };

  const onEdit = (id, updatedData) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
    setShowUpdateModal(false);
    setEditingTask(null);
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowUpdateModal(true);
  };

  const contextValue = {
    currentView,
    setCurrentView,
    tasks,
    setTasks,
    onEdit,
    onDelete,
    createTask,
    handleEditClick,
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
      <div className="max-w-7xl mx-auto px-2">
        <Header onCreateTask={() => setShowCreateModal(true)} />
        <Filters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        {currentView === "grid" && <GridView tasks={filteredTasks} />}
        {currentView === "calendar" && (
          <CalendarView
            tasks={filteredTasks}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {currentView === "timeline" && <TimeLine tasks={filteredTasks} />}
        {currentView === "list" && <ListView tasks={filteredTasks} />}
        {currentView === "chart" && <ChartView tasks={filteredTasks} />}
        {currentView === "kanban" && <KanbanView tasks={filteredTasks} />}
        {showCreateModal && (
          <TaskModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={createTask}
          />
        )}
        {showUpdateModal && editingTask && (
          <TaskModal
            task={editingTask}
            onSave={onEdit}
            onClose={() => {
              setShowUpdateModal(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
};
