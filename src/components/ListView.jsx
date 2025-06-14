import { useTaskContext } from "../context/context";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "./constants";

export const ListView = ({ tasks }) => {
  const { handleEditClick } = useTaskContext();

  const getStatusConfig = (status) => {
    return (
      STATUS_OPTIONS.find((s) => s.value === status) || {
        label: status,
        color: "bg-gray-100 text-gray-700",
      }
    );
  };

  const getPriorityConfig = (priority) => {
    return (
      PRIORITY_OPTIONS.find((p) => p.value === priority) || {
        label: priority,
        color: "text-gray-700",
      }
    );
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
            <th className="p-4 border-b border-gray-200 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
              Title
            </th>
            <th className="p-4 border-b border-gray-200 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
              Status
            </th>
            <th className="p-4 border-b border-gray-200 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
              Priority
            </th>
            <th className="p-4 border-b border-gray-200 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
              Deadline
            </th>
            <th className="p-4 border-b border-gray-200 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
              Person
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => {
            const statusConfig = getStatusConfig(task.status);
            const priorityConfig = getPriorityConfig(task.priority);

            return (
              <tr
                key={task.id}
                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
              >
                <td
                  className="p-4 text-gray-600 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEditClick(task)}
                >
                  {task.title}
                </td>
                <td
                  className={`p-4 text-sm cursor-pointer hover:opacity-80 transition-opacity ${statusConfig.color}`}
                  onClick={() => handleEditClick(task)}
                >
                  {statusConfig.label}
                </td>
                <td
                  className={`p-4 text-sm cursor-pointer hover:opacity-80 transition-opacity ${priorityConfig.color}`}
                  onClick={() => handleEditClick(task)}
                >
                  {priorityConfig.label}
                </td>
                <td
                  className="p-4 text-gray-600 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEditClick(task)}
                >
                  {task.deadline}
                </td>
                <td
                  className="p-4 text-gray-600 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEditClick(task)}
                >
                  {task.owner}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
