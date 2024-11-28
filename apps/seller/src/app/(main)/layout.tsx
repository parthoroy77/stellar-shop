import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import { FC, ReactNode } from "react";
import TopBar from "./components/top-bar";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <main className="custom-scrollbar max-h-screen w-full overflow-hidden overflow-y-scroll bg-white p-5">
        <TopBar />
        {children}
      </main>
    </>
  );
};

export default MainLayout;
