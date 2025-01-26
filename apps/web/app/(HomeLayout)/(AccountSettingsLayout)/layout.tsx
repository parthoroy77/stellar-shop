import AccountSettingsSidebar from "@/components/AccountSettings/account-settings-sidebar";
import AccountSettingsTab from "@/components/AccountSettings/account-settings-tabs";
import { ReactNode } from "react";

const AccountSettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-5 py-5 lg:flex-row lg:gap-8 lg:py-8">
      {/* For Web View */}
      <AccountSettingsSidebar />
      {/* For Mobile View */}
      <AccountSettingsTab />
      <div className="h-full lg:w-[80%]">{children}</div>
    </section>
  );
};

export default AccountSettingsLayout;
