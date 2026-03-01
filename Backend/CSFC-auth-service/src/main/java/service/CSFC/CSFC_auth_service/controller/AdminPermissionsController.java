package service.CSFC.CSFC_auth_service.controller;

import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.service.AdminPermissionsService;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin/roles")
public class AdminPermissionsController {

    private final AdminPermissionsService adminPermissionsService;

    @PostMapping("/{roleId}/permissions")
    public ResponseEntity<BaseResponse<Object>> addPermissionToRole(
            @PathVariable Integer roleId,
            @RequestParam @NotBlank String permissionName
    ) {
        adminPermissionsService.addPermissionToRole(roleId, permissionName.trim().toUpperCase());
        return ResponseEntity.ok(BaseResponse.success("Gán permission cho role thành công", null));
    }
}