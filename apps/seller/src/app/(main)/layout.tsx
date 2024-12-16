import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <main className="bg-sidebar custom-scrollbar max-h-screen w-full space-y-3 overflow-hidden overflow-y-scroll p-2 pb-0 pr-0">
        <div className="h-full w-full rounded-xl border bg-white p-5">
          {/* <TopBar /> */}
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
