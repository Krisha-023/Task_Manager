import { Search, Filter } from "lucide-react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "./constants";

export const Filters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SearchBar search={search} setSearch={setSearch} />
        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <PriorityFilter
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </div>
    </div>
  );
};

const SearchBar = ({ search, setSearch }) => (
  <div className="flex items-center gap-2 flex-1 min-w-[180px]">
    <Search className="w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
    />
  </div>
);

const StatusFilter = ({ statusFilter, setStatusFilter }) => (
  <div className="flex items-center gap-2 flex-1 min-w-[160px]">
    <Filter className="w-5 h-5 text-gray-400" />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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

const PriorityFilter = ({ priorityFilter, setPriorityFilter }) => (
  <div className="flex items-center gap-2 flex-1 min-w-[140px]">
    <span className="w-5 h-5" />
    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
    >
      <option value="all">All Priority</option>
      {PRIORITY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
