import MainLayout from "@/layouts/main-layout";
import PrivateRoute from "@/layouts/private-route";
import PublicRoute from "@/layouts/public-route";
import AttributeListPage from "@/pages/attribute-list-page";
import CategoriesPage from "@/pages/categories-page";
import DashboardPage from "@/pages/dashboard-page";
import LoginPage from "@/pages/login-page";
import OrderDetailPage from "@/pages/order-detail-page";
import OrdersPage from "@/pages/orders-page";
import ActiveProductsPage from "@/pages/product/active-products-page";
import PendingProductsPage from "@/pages/product/pending-products-page";
import SellerApprovalPage from "@/pages/seller-management/seller-approval-page";
import SellerListPage from "@/pages/seller-management/seller-list-page";
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
        element: <DashboardPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/seller-management",
        element: <Outlet />,
        children: [
          { index: true, element: <SellerListPage /> },
          { path: "seller-approval", element: <SellerApprovalPage /> },
        ],
      },

      {
        path: "/products",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ActiveProductsPage />,
          },
          {
            path: "active",
            element: <ActiveProductsPage />,
          },
          {
            path: "pending",
            element: <PendingProductsPage />,
          },
        ],
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailPage />,
      },
      {
        path: "/attributes",
        element: <AttributeListPage />,
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
