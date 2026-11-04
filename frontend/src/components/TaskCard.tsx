import { Pencil, Trash2, Check } from "lucide-react";

import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  return (
    <article className="task-card">
      <button
        className={`complete-button ${
          task.status === "completed" ? "checked" : ""
        }`}
        onClick={() => onToggle(task)}
        title="Toggle task status"
      >
        {task.status === "completed" && <Check size={15} />}
      </button>

      <div className="task-details">
        <h3 className={task.status === "completed" ? "completed-title" : ""}>
          {task.title}
        </h3>

        <p>{task.description || "No description"}</p>

        <div className="task-meta">
          <span className={`priority ${task.priority}`}>
            {task.priority} priority
          </span>

          <span className={`status ${task.status}`}>{task.status}</span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} title="Edit task">
          <Pencil size={17} />
        </button>

        <button
          className="delete-action"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
