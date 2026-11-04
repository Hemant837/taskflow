import { Search, ListTodo } from "lucide-react";

import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  search: string;
  filter: string;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onAddTask: () => void;
}

const TaskList = ({
  tasks,
  search,
  filter,
  loading,
  onSearchChange,
  onFilterChange,
  onToggle,
  onEdit,
  onDelete,
  onAddTask,
}: TaskListProps) => {
  return (
    <section className="task-section">

      <div className="task-toolbar">
        <div>
          <h2>All Tasks</h2>
          <p>Your tasks in one place</p>
        </div>

        <div className="toolbar-actions">
          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <ListTodo size={35} />
          <h3>No tasks found</h3>
          <p>Create a task or adjust your search filters.</p>

          <button className="primary-button" onClick={onAddTask}>
            Add your first task
          </button>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default TaskList;