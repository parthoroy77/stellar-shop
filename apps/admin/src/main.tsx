import "@repo/ui/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Providers from "./providers/providers.tsx";
import { routes } from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={routes} />
    </Providers>
  </React.StrictMode>
);
