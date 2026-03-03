import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { UserProfile } from "./components/UserProfile";
import { OrderManagement } from "./components/OrderManagement";
import { Inventory } from "./components/Inventory";
import { FranchiseOperations } from "./components/FranchiseOperations";
import { CustomerLoyalty } from "./components/CustomerLoyalty";
import { ERPIntegration } from "./components/ERPIntegration";
import { Compliance } from "./components/Compliance";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
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
    ],
  },
]);
