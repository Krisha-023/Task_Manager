import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "./constants";
import { useTaskContext } from "../context/context";

export const TaskModal = ({ task, onClose }) => {
  const { createTask, onEdit } = useTaskContext();
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo",
    priority: task?.priority || "low",
    owner: task?.owner || "",
    deadline: task?.deadline || "",
  });

  const handleSubmit = () => {
    if (task) {
      onEdit(task.id, formData);
    } else {
      createTask(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
       
        <h2 className="text-xl font-semibold mb-4">
          {task ? "Edit Task" : "Create New Task"}
        </h2>

        <div className="space-y-4">
          <Form
            label="Title"
            type="text"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />

          <Form
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Form
              label="Status"
              type="select"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={STATUS_OPTIONS}
            />

            <Form
              label="Priority"
              type="select"
              value={formData.priority}
              onChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
              options={PRIORITY_OPTIONS}
            />
          </div>

          <Form
            label="Owner"
            type="text"
            value={formData.owner}
            onChange={(value) => setFormData({ ...formData, owner: value })}
            required
          />

          <Form
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={(value) => setFormData({ ...formData, deadline: value })}
            required
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Form = ({ label, type, value, onChange, options, required }) => {
  const formClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formClass}
          rows="3"
          required={required}
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formClass}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formClass}
          required={required}
        />
      )}
    </div>
  );
};
