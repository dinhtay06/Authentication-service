# CAPITAL COFFEE SUPPLY CHAIN MANAGEMENT SYSTEM
## Complete Source Code

---

## 📁 PROJECT STRUCTURE

```
/src/app/
├── App.tsx                      # Main application entry
├── routes.tsx                   # Route configuration
└── components/
    ├── Layout.tsx               # Main layout with sidebar
    ├── Login.tsx                # Authentication page
    ├── Dashboard.tsx            # Main dashboard
    ├── UserProfile.tsx          # User profile
    ├── OrderManagement.tsx      # Order management
    ├── Inventory.tsx            # Inventory tracking
    ├── FranchiseOperations.tsx  # Franchise management
    ├── CustomerLoyalty.tsx      # Loyalty program
    ├── ERPIntegration.tsx       # ERP & POS
    ├── Compliance.tsx           # Compliance tracking
    └── Settings.tsx             # System settings
```

---

## 📦 PACKAGE DEPENDENCIES

**Main Dependencies:**
- `react` (18.3.1)
- `react-router` (7.13.0) - Client-side routing
- `recharts` (2.15.2) - Data visualization charts
- `lucide-react` (0.487.0) - Icon library
- `tailwindcss` (4.1.12) - Utility-first CSS

**Full package.json included below**

---

# 🔥 COMPLETE SOURCE CODE FILES

---

## 1️⃣ `/src/app/App.tsx`

```tsx
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## 2️⃣ `/src/app/routes.tsx`

```tsx
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
```

---

## 3️⃣ `/src/app/components/Layout.tsx` (186 lines)

```tsx
import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Store,
  Heart,
  Database,
  Shield,
  Settings,
  User,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Coffee,
} from 'lucide-react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = {
    name: 'John Anderson',
    role: 'Admin',
    email: 'john.anderson@capitalcoffee.com',
    avatar: 'JA',
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/orders', label: 'Order Management', icon: ShoppingCart },
    { path: '/inventory', label: 'Inventory & Supply', icon: Package },
    { path: '/franchise', label: 'Franchise Operations', icon: Store },
    { path: '/loyalty', label: 'Customer Loyalty', icon: Heart },
    { path: '/erp', label: 'ERP & POS', icon: Database },
    { path: '/compliance', label: 'Compliance', icon: Shield },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-amber-900 to-amber-950 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-amber-800">
          <div className="bg-amber-600 p-2 rounded-lg">
            <Coffee className="w-6 h-6" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg">Capital Coffee</h1>
              <p className="text-xs text-amber-300">Supply Chain Hub</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-100 hover:bg-amber-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-amber-800 hover:bg-amber-800 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, inventory, franchises..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{currentUser.avatar}</span>
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2"
                  >
                    <LogOut className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

This document is getting too large. Let me create a file with a download link to get all source code at once:
