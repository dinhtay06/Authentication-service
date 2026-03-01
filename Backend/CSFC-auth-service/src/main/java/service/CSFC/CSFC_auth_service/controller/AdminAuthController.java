package service.CSFC.CSFC_auth_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.AssignRoleRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.ResetPasswordResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserDetailResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserListResponse;
import service.CSFC.CSFC_auth_service.service.AdminUserService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/auth-users")
public class AdminAuthController {

    private final AdminUserService adminUserService;

    @PutMapping("/{id}/reset-password")
    public ResponseEntity<BaseResponse<ResetPasswordResponse>> resetPassword(
            @PathVariable UUID id
    ) {

        ResetPasswordResponse response = adminUserService.resetPassword(id);

        return ResponseEntity.ok(
                BaseResponse.success("Đặt lại mật khẩu thành công", response)
        );
    }

    @GetMapping
    public ResponseEntity<BaseResponse<UserListResponse>> getAllUsers() {

        UserListResponse response = adminUserService.getAllUsers();

        return ResponseEntity.ok(
                BaseResponse.success("Lấy danh sách người dùng thành công", response)
        );
    }

    // ================= GET USER DETAIL =================

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserDetailResponse>> getUserDetail(
            @PathVariable UUID id
    ) {

        UserDetailResponse response = adminUserService.getUserDetail(id);

        return ResponseEntity.ok(
                BaseResponse.success("Lấy chi tiết người dùng thành công", response)
        );
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<BaseResponse<String>> activateUser(
            @PathVariable UUID id
    ) {

        adminUserService.activateUser(id);

        return ResponseEntity.ok(
                BaseResponse.success("Kích hoạt tài khoản thành công", null)
        );
    }


    @PutMapping("/{id}/roles")
    public ResponseEntity<BaseResponse<String>> assignRole(
            @PathVariable UUID id,
            @RequestBody AssignRoleRequest request
    ) {

        adminUserService.assignRole(id, request.getRoleId());

        return ResponseEntity.ok(
                BaseResponse.success("Phân quyền cho người dùng thành công", null)
        );
    }
}