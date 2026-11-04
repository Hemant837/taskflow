import { X } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import type { Task } from "../types/task";

type TaskFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
}

function TaskModal({ isOpen, task, onClose, onSubmit }: TaskModalProps) {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "medium",
      });

      setError("");
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await onSubmit(form);
    } catch (err) {
      console.error(err);
      setError("Unable to save task. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>{task ? "Edit Task" : "Create New Task"}</h2>
            <p>Enter your task details below.</p>
          </div>

          <button type="button" onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            maxLength={255}
          />

          <label>Description</label>

          <textarea
            placeholder="Add some details..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />

          <label>Priority</label>

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value as TaskFormData["priority"],
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Saving..." : task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
