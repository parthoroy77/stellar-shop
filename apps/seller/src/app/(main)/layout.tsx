import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { FC, ReactNode } from "react";
import TopBar from "./components/top-bar";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <main className="bg-sidebar custom-scrollbar max-h-screen w-full space-y-3 overflow-hidden overflow-y-scroll p-2">
        <TopBar />
        <div className="h-full w-full rounded-xl border bg-white">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
