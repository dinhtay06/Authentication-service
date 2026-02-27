package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.model.dto.request.LoginRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.RefreshTokenRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.RegisterRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.AuthResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.RegisterResponse;


public interface AuthenticationService {
    AuthResponse login(LoginRequest request);
    RegisterResponse register(RegisterRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
}
