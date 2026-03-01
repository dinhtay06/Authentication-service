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
        return ResponseEntity.ok(adminUserService.resetPassword(id));
    }

    @GetMapping
    public ResponseEntity<BaseResponse<UserListResponse>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserDetailResponse>> getUserDetail(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                BaseResponse.success(
                        "Get user detail successfully",
                        adminUserService.getUserDetail(id)
                )
        );
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<BaseResponse<?>> activateUser(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(adminUserService.activateUser(id));
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<BaseResponse<?>> assignRole(
            @PathVariable UUID id,
            @RequestBody AssignRoleRequest request
    ) {
        return ResponseEntity.ok(
                adminUserService.assignRole(id, request.getRoleId())
        );
    }
}