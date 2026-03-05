import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "@/layouts/Layout";
import { Login } from "@/pages/Login";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { Dashboard } from "@/pages/Dashboard";
import { UserProfile } from "@/pages/UserProfile";
import { OrderManagement } from "@/pages/OrderManagement";
import { Inventory } from "@/pages/Inventory";
import { FranchiseOperations } from "@/pages/FranchiseOperations";
import { CustomerLoyalty } from "@/pages/CustomerLoyalty";
import { ERPIntegration } from "@/pages/ERPIntegration";
import { Compliance } from "@/pages/Compliance";
import { Settings } from "@/pages/Settings";
import UserListPage from "@/pages/admin/UserListPage";
import UserDetailPage from "@/pages/admin/UserDetailPage";
export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/register",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "profile", Component: UserProfile },
      { path: "orders", Component: OrderManagement },
      { path: "inventory", Component: Inventory },
      { path: "franchise", Component: FranchiseOperations },
      { path: "loyalty", Component: CustomerLoyalty },
      { path: "erp", Component: ERPIntegration },
      { path: "compliance", Component: Compliance },
      { path: "settings", Component: Settings },
      // Admin routes
      { path: "admin/users", Component: UserListPage },
      { path: "admin/users/:id", Component: UserDetailPage },
    ],
  },
]);
