import { useNavigate } from "react-router";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

export default function CreateUserHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/admin/users")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tạo Người Dùng</h1>
        <p className="text-gray-600">Thêm tài khoản mới vào hệ thống</p>
      </div>
    </div>
  );
}
