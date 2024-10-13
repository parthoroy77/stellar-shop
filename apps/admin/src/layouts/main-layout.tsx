import Sidebar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="flex max-h-screen w-full overflow-hidden">
      <Sidebar />
      <section className="custom-scrollbar h-screen flex-1 space-y-5 overflow-hidden overflow-y-scroll p-5">
        <TopBar />
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
