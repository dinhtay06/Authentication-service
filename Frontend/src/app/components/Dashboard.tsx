import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

export function Dashboard() {
  const kpis = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Orders',
      value: '342',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Inventory Items',
      value: '1,247',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Franchises',
      value: '48',
      change: '+4.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-amber-500',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 185000, orders: 120 },
    { month: 'Feb', revenue: 210000, orders: 145 },
    { month: 'Mar', revenue: 195000, orders: 135 },
    { month: 'Apr', revenue: 240000, orders: 168 },
    { month: 'May', revenue: 225000, orders: 152 },
    { month: 'Jun', revenue: 260000, orders: 182 },
  ];

  const inventoryDistribution = [
    { name: 'Coffee Beans', value: 450, color: '#78350f' },
    { name: 'Packaging', value: 320, color: '#b45309' },
    { name: 'Equipment', value: 180, color: '#d97706' },
    { name: 'Supplies', value: 297, color: '#f59e0b' },
  ];

  const franchisePerformance = [
    { name: 'North Region', sales: 450000, compliance: 98 },
    { name: 'South Region', sales: 380000, compliance: 95 },
    { name: 'East Region', sales: 520000, compliance: 99 },
    { name: 'West Region', sales: 410000, compliance: 97 },
  ];

  const alerts = [
    {
      type: 'critical',
      title: 'Low Stock Alert',
      message: '3 items below reorder threshold',
      time: '5 min ago',
    },
    {
      type: 'warning',
      title: 'Compliance Review Due',
      message: '2 franchises require quarterly audit',
      time: '1 hour ago',
    },
    {
      type: 'info',
      title: 'New Order Received',
      message: 'Franchise #24 placed bulk order',
      time: '2 hours ago',
    },
  ];

  const recentOrders = [
    { id: 'ORD-2341', franchise: 'Downtown Coffee #12', amount: '$4,850', status: 'Processing', date: '2026-02-25' },
    { id: 'ORD-2340', franchise: 'Riverside Brew #08', amount: '$3,200', status: 'Shipped', date: '2026-02-25' },
    { id: 'ORD-2339', franchise: 'City Center #15', amount: '$6,100', status: 'Delivered', date: '2026-02-24' },
    { id: 'ORD-2338', franchise: 'Harbor View #22', amount: '$2,950', status: 'Processing', date: '2026-02-24' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Franchise Management Hub</h1>
        <p className="text-gray-600 mt-1">Real-time insights and system overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={kpi.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {inventoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Franchise Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={franchisePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#d97706" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#d97706" name="Sales ($)" />
            <Bar yAxisId="right" dataKey="compliance" fill="#10b981" name="Compliance (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <Link to="/settings" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`w-5 h-5 flex-shrink-0 ${
                      alert.type === 'critical'
                        ? 'text-red-600'
                        : alert.type === 'warning'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link to="/orders" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.franchise}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          to="/orders"
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl p-6 transition-colors group"
        >
          <ShoppingCart className="w-8 h-8 mb-3" />
          <h4 className="font-semibold mb-1">Create Order</h4>
          <p className="text-sm text-amber-100">Place a new franchise order</p>
          <ArrowRight className="w-5 h-5 mt-3 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/inventory"
          className="bg-white border-2 border-gray-200 hover:border-amber-600 rounded-xl p-6 transition-colors group"
        >
          <Package className="w-8 h-8 mb-3 text-amber-600" />
          <h4 className="font-semibold mb-1 text-gray-900">Check Inventory</h4>
          <p className="text-sm text-gray-600">View stock levels</p>
          <ArrowRight className="w-5 h-5 mt-3 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/compliance"
          className="bg-white border-2 border-gray-200 hover:border-amber-600 rounded-xl p-6 transition-colors group"
        >
          <CheckCircle className="w-8 h-8 mb-3 text-amber-600" />
          <h4 className="font-semibold mb-1 text-gray-900">Compliance Check</h4>
          <p className="text-sm text-gray-600">Review audits</p>
          <ArrowRight className="w-5 h-5 mt-3 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/franchise"
          className="bg-white border-2 border-gray-200 hover:border-amber-600 rounded-xl p-6 transition-colors group"
        >
          <Users className="w-8 h-8 mb-3 text-amber-600" />
          <h4 className="font-semibold mb-1 text-gray-900">Franchise Hub</h4>
          <p className="text-sm text-gray-600">Manage locations</p>
          <ArrowRight className="w-5 h-5 mt-3 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
