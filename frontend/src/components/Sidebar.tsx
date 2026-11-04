import {
  CheckCircle2,
  LayoutDashboard,
  ListTodo,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <CheckCircle2 size={23} />
        </div>
        <span>TaskFlow</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">MENU</p>

        <div className="nav-item active">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </div>

        <div className="nav-item">
          <ListTodo size={19} />
          <span>My Tasks</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="profile-avatar">H</div>
        <div>
          <strong>My Workspace</strong>
          <small>Personal tasks</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;