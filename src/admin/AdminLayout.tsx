import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-muted/30">

      <AdminSidebar />

      {/* Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
