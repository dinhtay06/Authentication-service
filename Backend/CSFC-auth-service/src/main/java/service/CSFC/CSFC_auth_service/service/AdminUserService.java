package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.ResetPasswordResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserDetailResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserListResponse;

import java.util.UUID;

public interface AdminUserService {

    BaseResponse<ResetPasswordResponse> resetPassword(UUID userId);

    BaseResponse<UserListResponse> getAllUsers();

    UserDetailResponse getUserDetail(UUID userId);

    BaseResponse<?> activateUser(UUID userId);

    BaseResponse<?> assignRole(UUID userId, Long roleId);
}