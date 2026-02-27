package service.CSFC.CSFC_auth_service.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.LoginRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.RefreshTokenRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.RegisterRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.AuthResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.RegisterResponse;
import service.CSFC.CSFC_auth_service.service.AuthenticationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")

public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<BaseResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authenticationService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(BaseResponse.success("Đăng ký thành công", response));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authenticationService.login(request);
        return ResponseEntity.ok(BaseResponse.success("Đăng nhập thành công", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<BaseResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse authResponse = authenticationService.refreshToken(request);
        return ResponseEntity.ok(BaseResponse.success("Làm mới accessToken thành công", authResponse));
    }
}
