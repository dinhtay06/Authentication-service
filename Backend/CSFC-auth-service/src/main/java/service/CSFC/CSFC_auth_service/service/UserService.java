package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.model.dto.request.CreateUserRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;


public interface UserService
{
    UserResponse getCurrentUser(String email);
    UserResponse CreateUserWithRoleByAdmin(CreateUserRequest request);
}
