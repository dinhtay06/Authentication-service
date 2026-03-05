import { useState } from "react";
import { useNavigate } from "react-router";
import adminUserService, { CreateUserRequest } from "../../services/adminUserService";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { toast } from "sonner";

export default function CreateUserForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserRequest>({
    email: "",
    name: "",
    address: "",
    role: { name: "" },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;

    if (name === "role") {
      setFormData({ ...formData, role: { name: value } });
    } else {
      setFormData({ ...formData, [name]: value } as any);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await adminUserService.createUser(formData);

      if (response.success) {
        toast.success("Tạo người dùng thành công 🎉");
        navigate("/admin/users");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo người dùng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông Tin Tài Khoản</CardTitle>
        <CardDescription>
          Nhập thông tin để tạo người dùng mới
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Địa Chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Vai Trò</label>
            <select
              name="role"
              value={formData.role?.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            >
              <option value="">-- Chọn vai trò --</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Quản Lý</option>
              <option value="STAFF">Nhân Viên</option>
              <option value="USER">Người Dùng</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo Người Dùng"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
