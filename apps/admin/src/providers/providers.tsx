import { store } from "@/redux/store";
import { Provider } from "@repo/redux";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster richColors position="top-center" />
    </Provider>
  );
};

export default Providers;
