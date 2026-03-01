package service.CSFC.CSFC_auth_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.CreateUserRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;
import service.CSFC.CSFC_auth_service.service.AuthenticationService;
import service.CSFC.CSFC_auth_service.service.UserService;
import tools.jackson.core.ObjectReadContext;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    //add sau khi có phân quyền động
    //@PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping("/create-account")
    public ResponseEntity<BaseResponse<UserResponse>> createAccountByAdmin(@Valid @RequestBody CreateUserRequest request){
        UserResponse response= userService.CreateUserWithRoleByAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success("Tạo tài khoản thành công",response));
    }
}
