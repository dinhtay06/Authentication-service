import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import adminUserService, { UserResponse, PaginatedResponse } from '../../services/adminUserService';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { Badge } from '../../components/ui/badge';
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
import { Eye, RotateCcw, Lock } from 'lucide-react';

export default function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<UserResponse> | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, size, sortBy, sortDir]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminUserService.getAllUsers(page, size, sortBy, sortDir);
      if (response.success) {
        setUsers(response.data.content);
        setPagination(response.data);
      } else {
        toast.error(response.message || 'Lỗi tải danh sách người dùng');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUserId) return;
    try {
      setResettingPassword(true);
      const response = await adminUserService.resetPassword(selectedUserId);
      if (response.success) {
        toast.success('Đặt lại mật khẩu thành công');
        setResetDialogOpen(false);
        setSelectedUserId(null);
        fetchUsers();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi đặt lại mật khẩu');
    } finally {
      setResettingPassword(false);
    }
  };

  const handleViewDetail = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      ACTIVE: { variant: 'default' },
      INACTIVE: { variant: 'secondary' },
      LOCKED: { variant: 'destructive' },
      PENDING: { variant: 'outline' },
    };

    return (
      <Badge variant={statusConfig[status]?.variant || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(parseInt(e.target.value));
    setPage(0);
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản Lý Người Dùng</h1>
        <p className="text-gray-600 mt-2">Danh sách tất cả người dùng trong hệ thống</p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={size}
          onChange={handleSizeChange}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value={5}>5 trên trang</option>
          <option value={10}>10 trên trang</option>
          <option value={20}>20 trên trang</option>
          <option value={50}>50 trên trang</option>
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Điện Thoại</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Ngày Tạo</TableHead>
              <TableHead className="text-right">Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || '-'}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetail(user.id)}
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setResetDialogOpen(true);
                      }}
                      title="Đặt lại mật khẩu"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Không tìm thấy người dùng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination>
            <PaginationContent>
              {page > 0 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: pagination.totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    onClick={() => handlePageChange(idx)}
                    isActive={idx === page}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {page < pagination.totalPages - 1 && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đặt lại mật khẩu</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn đặt lại mật khẩu cho người dùng này? Mật khẩu tạm sẽ được gửi cho họ qua email.
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
  );
}
