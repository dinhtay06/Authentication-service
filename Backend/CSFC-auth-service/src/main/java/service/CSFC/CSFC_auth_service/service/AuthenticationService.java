package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.request.*;
import service.CSFC.CSFC_auth_service.model.dto.response.*;

import java.util.UUID;

public interface AuthenticationService {

    // ===== USER AUTH =====
    AuthResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    // ===== ADMIN =====
    BaseResponse<ResetPasswordResponse> resetPasswordByAdmin(UUID userId);

    BaseResponse<?> getAllUsers();

    UserDetailResponse getUserDetailByAdmin(UUID userId);

    BaseResponse<?> activateUserByAdmin(UUID userId);

    BaseResponse<?> assignRoleByAdmin(UUID userId, Long roleId);
}