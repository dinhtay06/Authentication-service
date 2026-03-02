package service.CSFC.CSFC_auth_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.CreateUserRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;
import service.CSFC.CSFC_auth_service.service.UserService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    //@PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<String>> deleteUser(@PathVariable UUID id) {

        userService.deleteUserByAdmin(id);

        return ResponseEntity.ok(
                BaseResponse.success("Xóa người dừng thành công", null)
        );
    }
    //@PreAuthorize("hasAuthority('USER_DEACTIVATE')")
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<BaseResponse<String>> deactivateUser(@PathVariable UUID id) {
        userService.deActivateUserByAdmin(id);
        return ResponseEntity.ok(BaseResponse.success("Vô hiệu hóa người dùng thành công", null));
    }
    //add sau khi có phân quyền động
    //@PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping("/create-account")
    public ResponseEntity<BaseResponse<UserResponse>> createAccountByAdmin(@Valid @RequestBody CreateUserRequest request){
        UserResponse response= userService.CreateUserWithRoleByAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success("Tạo tài khoản thành công",response));
    }

}
