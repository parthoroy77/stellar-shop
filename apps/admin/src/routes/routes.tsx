import MainLayout from "@/layouts/main-layout";
import PrivateRoute from "@/layouts/private-route";
import PublicRoute from "@/layouts/public-route";
import LoginPage from "@/pages/login-page";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
]);
