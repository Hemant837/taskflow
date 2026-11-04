import { useEffect, useMemo, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import type { Task } from "./types/task";

import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
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
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (form: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => {
    if (editingTask) {
      await updateTask(editingTask.id, form);
    } else {
      await createTask(form);
    }

    setModalOpen(false);
    setEditingTask(null);

    await fetchTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await updateTask(task.id, {
        status: task.status === "completed" ? "pending" : "completed",
      });

      await fetchTasks();
    } catch (err) {
      console.error(err);
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
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="main-content">
        <Header onAddTask={openAddModal} />

        {/* Statistics */}
        <StatsCards
          total={totalTasks}
          pending={pendingTasks}
          completed={completedTasks}
        />

        {/* Task Section */}
        <TaskList
          tasks={filteredTasks}
          search={search}
          filter={filter}
          loading={loading}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onToggle={handleToggleStatus}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onAddTask={openAddModal}
        />
      </main>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          task={editingTask}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;
