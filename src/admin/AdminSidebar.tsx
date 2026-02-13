import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white">
            🎓
          </div>
          <span className="font-semibold text-sm">CET Admin</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={cn(
          "fixed lg:fixed top-0 left-0 z-50 w-64 h-screen bg-white border-r flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Desktop Header (hidden on mobile because mobile header is separate) */}
        <div className="hidden lg:flex h-16 items-center gap-3 px-6 border-b">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-white">
            🎓
          </div>
          <div>
            <h1 className="text-sm font-semibold">CET Admin</h1>
            <p className="text-xs text-muted-foreground">
              Mock Test System
            </p>
          </div>
        </div>

        {/* Close Button (Mobile only) */}
        <div className="flex lg:hidden justify-end p-4 border-b">
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* ================= MENU ================= */}
        <nav className="flex-1 px-3 py-4 space-y-1 mt-2">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            onClick={() => setOpen(false)}
          />

          <NavItem
            to="/admin/questions"
            icon={<BookOpen size={18} />}
            label="Question Bank"
            onClick={() => setOpen(false)}
          />
        </nav>
      </aside>
    </>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition",
        isActive
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-muted"
      )
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default AdminSidebar;
