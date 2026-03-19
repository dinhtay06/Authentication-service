import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  AlertTriangle,
} from 'lucide-react';

export function OrderManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const orders = [
    {
      id: 'ORD-2341',
      franchise: 'Downtown Coffee #12',
      franchiseId: 'FR-012',
      supplier: 'Premium Beans Co.',
      supplierApproved: true,
      items: ['Arabica Beans (50kg)', 'Packaging Materials', 'Cups (1000 units)'],
      amount: 4850,
      status: 'Processing',
      date: '2026-02-25',
      estimatedDelivery: '2026-02-28',
    },
    {
      id: 'ORD-2340',
      franchise: 'Riverside Brew #08',
      franchiseId: 'FR-008',
      supplier: 'Equipment Express',
      supplierApproved: true,
      items: ['Espresso Machine Parts', 'Grinder Blades'],
      amount: 3200,
      status: 'Shipped',
      date: '2026-02-25',
      estimatedDelivery: '2026-02-26',
    },
    {
      id: 'ORD-2339',
      franchise: 'City Center #15',
      franchiseId: 'FR-015',
      supplier: 'Global Coffee Supply',
      supplierApproved: true,
      items: ['Robusta Beans (75kg)', 'Syrups', 'Milk (200L)'],
      amount: 6100,
      status: 'Delivered',
      date: '2026-02-24',
      estimatedDelivery: '2026-02-25',
    },
    {
      id: 'ORD-2338',
      franchise: 'Harbor View #22',
      franchiseId: 'FR-022',
      supplier: 'Quick Supply Ltd.',
      supplierApproved: false,
      items: ['Coffee Beans (30kg)'],
      amount: 2950,
      status: 'Blocked',
      date: '2026-02-24',
      estimatedDelivery: 'N/A',
    },
    {
      id: 'ORD-2337',
      franchise: 'Sunset Cafe #31',
      franchiseId: 'FR-031',
      supplier: 'Premium Beans Co.',
      supplierApproved: true,
      items: ['Arabica Beans (100kg)', 'Tea Supplies'],
      amount: 8500,
      status: 'Processing',
      date: '2026-02-23',
      estimatedDelivery: '2026-02-27',
    },
  ];

  const statusConfig = {
    Processing: { icon: Clock, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    Shipped: { icon: Truck, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    Delivered: { icon: CheckCircle, color: 'bg-green-100 text-green-700 border-green-200' },
    Blocked: { icon: AlertTriangle, color: 'bg-red-100 text-red-700 border-red-200' },
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.franchise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage franchise orders</p>
        </div>
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'Processing').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'Delivered').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Blocked</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'Blocked').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, franchise, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="blocked">Blocked</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Franchise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">Delivery: {order.estimatedDelivery}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{order.franchise}</p>
                      <p className="text-xs text-gray-500">{order.franchiseId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-900">{order.supplier}</p>
                        {order.supplierApproved ? (
                          <CheckCircle className="w-4 h-4 text-green-600" title="Approved Supplier" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" title="Non-approved Supplier" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{order.items.length} items</p>
                      <p className="text-xs text-gray-500">{order.items[0]}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">${order.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          statusConfig[order.status as keyof typeof statusConfig].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Order</h2>
              <p className="text-gray-600 mt-1">Fill in the details to place a new franchise order</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Franchise</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Downtown Coffee #12</option>
                  <option>Riverside Brew #08</option>
                  <option>City Center #15</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Supplier</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Premium Beans Co. ✓ Approved</option>
                  <option>Equipment Express ✓ Approved</option>
                  <option>Global Coffee Supply ✓ Approved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
                <textarea
                  rows={4}
                  placeholder="Enter items (one per line)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Compliance Check:</strong> Only approved suppliers can be selected. Orders from non-approved
                  suppliers will be automatically blocked.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
