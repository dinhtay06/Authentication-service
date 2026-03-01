package service.CSFC.CSFC_auth_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.common.security.CustomerUserDetails;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;
import service.CSFC.CSFC_auth_service.service.UserService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users") // Đồng nhất dùng prefix /api
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<UserResponse>> getCurrentUser(
            @AuthenticationPrincipal CustomerUserDetails currentUser
    ) {
        String email = currentUser.getUser().getEmail();
        UserResponse response = userService.getCurrentUser(email);
        return ResponseEntity.ok(
                BaseResponse.success("Lấy thông tin người dùng thành công", response)
        );
    }

   
    //@PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<String>> deleteUser(@PathVariable UUID id) {
        userService.deleteUserByAdmin(id);
        return ResponseEntity.ok(
                // Mình đã sửa lỗi chính tả "người dừng" thành "người dùng" ở đây nhé
                BaseResponse.success("Xóa người dùng thành công", null) 
        );
    }

   
    //@PreAuthorize("hasAuthority('USER_DEACTIVATE')")
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<BaseResponse<String>> deactivateUser(@PathVariable UUID id) {
        userService.deActivateUserByAdmin(id);
        return ResponseEntity.ok(
                BaseResponse.success("Vô hiệu hóa người dùng thành công", null)
        );
    }
}