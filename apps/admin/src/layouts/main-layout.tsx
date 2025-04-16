import Sidebar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="flex max-h-screen w-full overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <section className="custom-scrollbar h-screen flex-1 space-y-5 overflow-hidden overflow-y-scroll bg-neutral-50 p-5">
        <TopBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
