package service.CSFC.CSFC_auth_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.AssignRoleRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.ResetPasswordResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserDetailResponse;
import service.CSFC.CSFC_auth_service.service.AuthenticationService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/auth-users")
public class AdminAuthController {

    private final AuthenticationService authenticationService;

    @PutMapping("/{id}/reset-password")
    public BaseResponse<ResetPasswordResponse> resetPassword(
            @PathVariable UUID id
    ) {
        return authenticationService.resetPasswordByAdmin(id);
    }

    @GetMapping
    public BaseResponse<?> getAllUsers() {
        return authenticationService.getAllUsers();
    }

    @GetMapping("/{id}")
    public BaseResponse<UserDetailResponse> getUserDetail(
            @PathVariable UUID id
    ) {
        UserDetailResponse response =
                authenticationService.getUserDetailByAdmin(id);

        return BaseResponse.success("Get user detail successfully", response);
    }

    @PutMapping("/{id}/activate")
    public BaseResponse<?> activateUser(
            @PathVariable UUID id
    ) {
        return authenticationService.activateUserByAdmin(id);
    }

    @PutMapping("/{id}/roles")
    public BaseResponse<?> assignRole(
            @PathVariable UUID id,
            @RequestBody AssignRoleRequest request
    ) {
        return authenticationService.assignRoleByAdmin(id, request.getRoleId());
    }
}