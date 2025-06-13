import { Grid, CalendarDays, List } from "lucide-react";
import { useTaskContext } from "../context/context";

export const ViewOptions = () => {
  const views = [
    { id: "grid", label: "Grid", icon: Grid },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "timeline", label: "Timeline", icon: List },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {views.map((view) => {
        const IconComponent = view.icon;
        return (
          <ViewToggleButton
            key={view.id}
            view={view}
            IconComponent={IconComponent}
          />
        );
      })}
    </div>
  );
};

const ViewToggleButton = ({ view, IconComponent }) => {
  const { currentView, setCurrentView } = useTaskContext();

  return (
    <button
      onClick={() => setCurrentView(view.id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        currentView === view.id
          ? "bg-white text-blue-600 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <IconComponent className="w-4 h-4" />
      {view.label}
    </button>
  );
};
