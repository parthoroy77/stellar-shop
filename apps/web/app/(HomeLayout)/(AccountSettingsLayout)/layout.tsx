import ProfileSidebar from "@/components/AccountSettings/Profile/profile-sidebar";
import { ReactNode } from "react";

const AccountSettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex gap-8 py-10">
      <ProfileSidebar />
      <div className="h-full lg:w-[80%]">{children}</div>
    </section>
  );
};

export default AccountSettingsLayout;
