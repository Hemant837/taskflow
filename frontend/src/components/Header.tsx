import { Plus } from "lucide-react";

interface HeaderProps {
  onAddTask: () => void;
}

const Header = ({ onAddTask }: HeaderProps) => {
  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">Workspace / Dashboard</p>
        <h1>My Tasks</h1>
        <p className="subtitle">Manage your tasks and stay productive.</p>
      </div>

      <button className="primary-button" onClick={onAddTask}>
        <Plus size={19} />
        Add Task
      </button>
    </header>
  );
};

export default Header;
