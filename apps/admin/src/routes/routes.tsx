import MainLayout from "@/layouts/main-layout";
import PrivateRoute from "@/layouts/private-route";
import PublicRoute from "@/layouts/public-route";
import CategoriesPage from "@/pages/categories-page";
import LoginPage from "@/pages/login-page";
import PendingProductsPage from "@/pages/seller-management/pending-products-page";
import SellerApprovalPage from "@/pages/seller-management/seller-approval-page";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/seller-management",
        element: <Outlet />,
        children: [{ path: "seller-approval", element: <SellerApprovalPage /> }],
      },

      {
        path: "/products",
        element: <Outlet />,
        children: [{ path: "pending", element: <PendingProductsPage /> }],
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
