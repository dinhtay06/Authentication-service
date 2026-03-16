import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import adminUserService, { UserDetailResponse, Role } from '../../services/adminUserService';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { toast } from 'sonner';
import { ArrowLeft, Edit2, RotateCcw, Lock, CheckCircle, XCircle } from 'lucide-react';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activatingUser, setActivatingUser] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [assigningRole, setAssigningRole] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (id) {
      fetchUserDetail();
      fetchRoles();
    }
  }, [id]);

  const fetchRoles = async () => {
    try {
      const response = await adminUserService.getAllRoles();
      if (response && response.data) {
        setAvailableRoles(response.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchUserDetail = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await adminUserService.getUserDetail(id);
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error(response.message || 'Lỗi tải thông tin người dùng');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải thông tin người dùng');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!id) return;
    try {
      setResettingPassword(true);
      const response = await adminUserService.resetPassword(id);
      if (response.success) {
        toast.success('Đặt lại mật khẩu thành công');
        setResetPasswordDialogOpen(false);
        fetchUserDetail();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi đặt lại mật khẩu');
    } finally {
      setResettingPassword(false);
    }
  };

  const handleActivateUser = async () => {
    if (!id) return;
    try {
      setActivatingUser(true);
      const response = await adminUserService.activateUser(id);
      if (response.success) {
        toast.success('Kích hoạt tài khoản thành công');
        setActivateDialogOpen(false);
        fetchUserDetail();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi kích hoạt tài khoản');
    } finally {
      setActivatingUser(false);
    }
  };

  const handleAssignRole = async () => {
    if (!id || !selectedRole) return;
    try {
      setAssigningRole(true);
      const response = await adminUserService.assignRole(id, selectedRole);
      if (response.success) {
        toast.success('Chỉ định vai trò thành công');
        setAssignRoleDialogOpen(false);
        setSelectedRole('');
        fetchUserDetail();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi chỉ định vai trò');
    } finally {
      setAssigningRole(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
      ACTIVE: { variant: 'default', icon: <CheckCircle className="h-4 w-4 mr-1" /> },
      INACTIVE: { variant: 'secondary', icon: <XCircle className="h-4 w-4 mr-1" /> },
      LOCKED: { variant: 'destructive', icon: <Lock className="h-4 w-4 mr-1" /> },
      PENDING: { variant: 'outline', icon: <Edit2 className="h-4 w-4 mr-1" /> },
    };

    const config = statusConfig[status] || { variant: 'secondary', icon: null };
    return (
      <Badge variant={config.variant} className="flex items-center w-fit">
        {config.icon}
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Không tìm thấy người dùng</p>
        <Button onClick={() => navigate('/admin/users')}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/users')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cá Nhân</CardTitle>
            <CardDescription>Chi tiết tài khoản người dùng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tên</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm font-medium text-gray-500">Điện Thoại</p>
                <p className="text-lg">{user.phone}</p>
              </div>
            )}
            {user.address && (
              <div>
                <p className="text-sm font-medium text-gray-500">Địa Chỉ</p>
                <p className="text-lg">{user.address}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500">Trạng Thái</p>
              <div className="mt-2">{getStatusBadge(user.status)}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ngày Tạo</p>
              <p className="text-lg">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vai Trò & Quyền Hạn</CardTitle>
            <CardDescription>Quản lý vai trò và quyền hạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Vai Trò</p>
              <div className="space-y-2">
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <Badge key={role.id} variant="outline">{role.name}</Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Chưa có vai trò nào</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Quyền Hạn</p>
              <div className="space-y-2">
                {user.permissions && user.permissions.length > 0 ? (
                  user.permissions.map((permission, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Không có quyền hạn nào</p>
                )}
              </div>
            </div>

            <Dialog open={assignRoleDialogOpen} onOpenChange={setAssignRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" variant="outline">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Chỉ định Vai Trò
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chỉ định Vai Trò</DialogTitle>
                  <DialogDescription>
                    Chọn vai trò mới cho người dùng {user.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">-- Chọn vai trò --</option>
                    {availableRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.roleName || role.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setAssignRoleDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button
                      onClick={handleAssignRole}
                      disabled={assigningRole || !selectedRole}
                    >
                      {assigningRole ? 'Đang xử lý...' : 'Xác nhận'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hành Động Quản Lý</CardTitle>
          <CardDescription>Thực hiện các hành động quản lý tài khoản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            {user.status !== 'ACTIVE' && (
              <AlertDialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
                <Button
                  variant="outline"
                  onClick={() => setActivateDialogOpen(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kích Hoạt Tài Khoản
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Kích Hoạt Tài Khoản</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc muốn kích hoạt tài khoản cho {user.name}? Họ sẽ có thể đăng nhập vào hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleActivateUser}
                      disabled={activatingUser}
                    >
                      {activatingUser ? 'Đang xử lý...' : 'Xác nhận'}
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <AlertDialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
              <Button
                variant="outline"
                onClick={() => setResetPasswordDialogOpen(true)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Đặt Lại Mật Khẩu
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Đặt Lại Mật Khẩu</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc muốn đặt lại mật khẩu cho {user.name}? Mật khẩu tạm sẽ được gửi qua email.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-3 justify-end">
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetPassword}
                    disabled={resettingPassword}
                  >
                    {resettingPassword ? 'Đang xử lý...' : 'Xác nhận'}
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
