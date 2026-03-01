package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.model.dto.response.*;

import java.util.UUID;

public interface AdminUserService {

    ResetPasswordResponse resetPassword(UUID userId);

    UserListResponse getAllUsers();

    UserDetailResponse getUserDetail(UUID userId);

    void activateUser(UUID userId);

    void assignRole(UUID userId, Long roleId);
}