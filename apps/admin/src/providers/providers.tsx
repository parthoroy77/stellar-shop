import { Provider } from "@repo/redux";
import { store } from "@repo/redux/store";
import { ReactNode } from "react";
import { Toaster } from "sonner";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster richColors />
    </Provider>
  );
};

export default Providers;
