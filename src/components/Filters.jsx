import { Search, Filter } from "lucide-react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "./constants";
import { useTaskContext } from "../context/context";

export const Filters = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <SearchBar />
        <StatusFilter />
        <PriorityFilter />
      </div>
    </div>
  );
};

const SearchBar = () => {
  const { search, setSearch } = useTaskContext();
  return (
    <div className="flex items-center gap-2">
      <Search className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const StatusFilter = () => {
  const { statusFilter, setStatusFilter } = useTaskContext();
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-400" />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const PriorityFilter = () => {
  const { priorityFilter, setPriorityFilter } = useTaskContext();
  return (
    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All Priority</option>
      {PRIORITY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
