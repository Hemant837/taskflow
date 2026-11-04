import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Clock3,
  ListTodo,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import type { Task } from "./types/task";

import "./App.css";

type TaskFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
  });

  const fetchTasks = async () => {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && task.status === "pending") ||
        (filter === "completed" && task.status === "completed");

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const openAddModal = () => {
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      priority: "medium",
    });
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
      } else {
        await createTask(form);
      }

      setModalOpen(false);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to save task. Please try again.");
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await updateTask(task.id, {
        status: task.status === "completed" ? "pending" : "completed",
      });

      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to update task status.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to delete task.");
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>My Tasks</h1>
            <p className="subtitle">Manage your tasks and stay productive.</p>
          </div>

          <button className="primary-button" onClick={openAddModal}>
            <Plus size={19} />
            Add Task
          </button>
        </header>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <ListTodo size={22} />
            </div>
            <div>
              <p>Total Tasks</p>
              <h2>{totalTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Clock3 size={22} />
            </div>
            <div>
              <p>Pending</p>
              <h2>{pendingTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p>Completed</p>
              <h2>{completedTasks}</h2>
            </div>
          </div>
        </section>

        {/* Task Section */}
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError("")}>
                <X size={16} />
              </button>
            </div>
          )}

          {loading ? (
            <div className="empty-state">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <ListTodo size={35} />
              <h3>No tasks found</h3>
              <p>Create a task or adjust your search filters.</p>
              <button className="primary-button" onClick={openAddModal}>
                <Plus size={18} />
                Add your first task
              </button>
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <article className="task-card" key={task.id}>
                  <button
                    className={`complete-button ${
                      task.status === "completed" ? "checked" : ""
                    }`}
                    onClick={() => handleToggleStatus(task)}
                    title="Toggle task status"
                  >
                    {task.status === "completed" && <Check size={15} />}
                  </button>

                  <div className="task-details">
                    <h3
                      className={
                        task.status === "completed" ? "completed-title" : ""
                      }
                    >
                      {task.title}
                    </h3>

                    <p>{task.description || "No description"}</p>

                    <div className="task-meta">
                      <span className={`priority ${task.priority}`}>
                        {task.priority} priority
                      </span>

                      <span
                        className={`status ${
                          task.status === "completed" ? "completed" : "pending"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => openEditModal(task)}
                      title="Edit task"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      className="delete-action"
                      onClick={() => handleDelete(task.id)}
                      title="Delete task"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
                <p>Enter your task details below.</p>
              </div>

              <button onClick={() => setModalOpen(false)}>
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
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
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

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
