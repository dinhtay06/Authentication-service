package service.CSFC.CSFC_auth_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.RolesRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.UpdateRolesRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.RolesResponse;
import service.CSFC.CSFC_auth_service.service.RolesService;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolesController {

       private final RolesService rolesService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<RolesResponse>> createRole(@RequestBody RolesRequest request) {
           RolesResponse response = rolesService.createRole(request);
           return ResponseEntity.ok(BaseResponse.success("Tạo role thành công", response));
    }
    @PostMapping("/update")
    public ResponseEntity<BaseResponse<RolesResponse>> updateRole(@RequestBody UpdateRolesRequest request) {
        RolesResponse response = rolesService.updateRoleById(request);
        return ResponseEntity.ok(BaseResponse.success("Cập nhật role thành công", response));
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllRoles() {
        return ResponseEntity.ok(BaseResponse.success("Lấy danh sách role thành công", rolesService.getAllRoles()));
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteRole(@PathVariable int id) {
        rolesService.deleteRoleById(id);
        return ResponseEntity.ok(BaseResponse.success("Xóa role thành công", id));
        }

}
