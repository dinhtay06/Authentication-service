import { useEffect, useState } from 'react';
import { Lock, Plus, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { getAllPermissions, getPermissionsByRole, addPermissionToRole } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Permission {
  id?: number;
  permissionName: string;
  description?: string;
}

interface Role {
  id: number;
  name: string;
}

export function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'byRole'>('all');

  // TODO: Replace mockRoles with API call to getRoles() if available
  const mockRoles: Role[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];

  // Fetch all permissions from database
  const fetchAllPermissions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllPermissions();
      setPermissions(response.data.data || []);
      setSuccess('Đã tải danh sách quyền thành công');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Lỗi khi tải danh sách quyền';
      setError(message);
      console.error('Error fetching permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch permissions for selected role from database
  const fetchRolePermissions = async (roleId: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await getPermissionsByRole(roleId);
      setRolePermissions(response.data.data || []);
      setSuccess('Đã tải danh sách quyền của role thành công');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Lỗi khi tải danh sách quyền của role';
      setError(message);
      console.error('Error fetching role permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle role selection
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    fetchRolePermissions(role.id);
    setActiveTab('byRole');
  };

  // Handle add permission to role
  const handleAddPermission = async () => {
    if (!selectedRole || !newPermission.trim()) {
      setError('Vui lòng chọn role và nhập tên quyền');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addPermissionToRole(selectedRole.id, newPermission);
      setNewPermission('');
      setSuccess('Đã gán quyền cho role thành công');
      setTimeout(() => setSuccess(''), 3000);
      // Refresh role permissions from database
      fetchRolePermissions(selectedRole.id);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Lỗi khi gán quyền cho role';
      setError(message);
      console.error('Error adding permission:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-3 rounded-lg">
            <Lock className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản Lý Quyền</h1>
            <p className="text-gray-500">Quản lý quyền hạn và phân quyền cho các role</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Tất Cả Quyền
        </button>
        <button
          onClick={() => setActiveTab('byRole')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'byRole'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Quyền Theo Role
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'all' ? (
        // All Permissions Tab
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Danh Sách Quyền</h2>
                <span className="text-sm text-gray-500">
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : `${permissions.length} quyền`}
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader className="w-6 h-6 animate-spin text-amber-600" />
                </div>
              ) : permissions.length > 0 ? (
                <div className="space-y-2">
                  {permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-amber-700" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{permission.permissionName}</p>
                          {permission.description && (
                            <p className="text-sm text-gray-500">{permission.description}</p>
                          )}
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Lock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Không có quyền nào</p>
                </div>
              )}
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">
                  {permissions.length}
                </div>
                <p className="text-amber-900 font-medium">Tổng Quyền</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  {mockRoles.length}
                </div>
                <p className="text-blue-900 font-medium">Tổng Role</p>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50">
              <h3 className="font-semibold text-gray-900 mb-3">Các Role</h3>
              <div className="space-y-2">
                {mockRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white hover:bg-amber-50 transition-colors text-sm font-medium text-gray-900 border border-gray-200"
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        // Permissions by Role Tab
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {selectedRole ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Quyền của Role: <span className="text-amber-600">{selectedRole.name}</span>
                  </h2>
                  <span className="text-sm text-gray-500">
                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : `${rolePermissions.length} quyền`}
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-amber-600" />
                  </div>
                ) : rolePermissions.length > 0 ? (
                  <div className="space-y-2">
                    {rolePermissions.map((permission, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-amber-700" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{permission.permissionName}</p>
                            {permission.description && (
                              <p className="text-sm text-gray-500">{permission.description}</p>
                            )}
                          </div>
                        </div>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Lock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Role này không có quyền nào</p>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-6 text-center py-12">
                <Lock className="w-12 h-12 mx-auto mb-2 opacity-50 text-gray-400" />
                <p className="text-gray-500">Chọn một role để xem quyền của nó</p>
              </Card>
            )}
          </div>

          {/* Add Permission Form */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Thêm Quyền cho Role</h3>

              {selectedRole ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role: <span className="text-amber-600 font-semibold">{selectedRole.name}</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên Quyền
                    </label>
                    <Input
                      type="text"
                      placeholder="Ví dụ: PERMISSION_ASSIGN"
                      value={newPermission}
                      onChange={(e) => setNewPermission(e.target.value.toUpperCase())}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tên quyền sẽ được chuyển thành chữ hoa tự động
                    </p>
                  </div>

                  <Button
                    onClick={handleAddPermission}
                    disabled={loading || !newPermission.trim()}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {loading ? 'Đang xử lý...' : 'Thêm Quyền'}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Vui lòng chọn một role trước</p>
                </div>
              )}
            </Card>

            <Card className="p-4 bg-amber-50">
              <h3 className="font-semibold text-gray-900 mb-3">Các Role</h3>
              <div className="space-y-2">
                {mockRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium border ${
                      selectedRole?.id === role.id
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-gray-900 border-gray-200 hover:bg-amber-50'
                    }`}
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
