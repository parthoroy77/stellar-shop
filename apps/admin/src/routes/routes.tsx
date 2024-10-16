import MainLayout from "@/layouts/main-layout";
import LoginPage from "@/pages/login-page";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
