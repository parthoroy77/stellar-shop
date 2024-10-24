import MainLayout from "@/layouts/main-layout";
import PrivateRoute from "@/layouts/private-route";
import PublicRoute from "@/layouts/public-route";
import CategoryListPage from "@/pages/category-list-page";
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
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "/category-list",
        element: <CategoryListPage />,
      },
      {
        path: "/add-category",
        element: <div>Hi hello</div>,
      },
    ],
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
