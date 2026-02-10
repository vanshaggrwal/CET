import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      {/* LOGO */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
          🎓
        </div>
        <div>
          <h1 className="text-sm font-semibold">CET Admin</h1>
          <p className="text-xs text-muted-foreground">Mock Test System</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavItem
          to="/admin"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <NavItem
          to="/admin/questions"
          icon={<BookOpen size={18} />}
          label="Question Bank"
        />
      </nav>
    </aside>
  );
};

const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
      ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default AdminSidebar;
