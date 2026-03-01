package service.CSFC.CSFC_auth_service.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.mapper.UserMapper;
import service.CSFC.CSFC_auth_service.model.dto.response.ResetPasswordResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserDetailResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserListResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;
import service.CSFC.CSFC_auth_service.model.entity.Roles;
import service.CSFC.CSFC_auth_service.model.entity.Users;
import service.CSFC.CSFC_auth_service.model.util.PasswordUtil;
import service.CSFC.CSFC_auth_service.repository.RolesRepository;
import service.CSFC.CSFC_auth_service.repository.UsersRepository;
import service.CSFC.CSFC_auth_service.service.AdminUserService;

import java.util.List;
import java.util.UUID;

@Service

@RequiredArgsConstructor
public class AdminUserServiceImp implements AdminUserService {

    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public BaseResponse<ResetPasswordResponse> resetPassword(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        String rawPassword = PasswordUtil.generateRandomPassword(10);

        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setIsFirstLogin(true);

        usersRepository.save(user);

        return BaseResponse.success(
                "Đặt lại mật khẩu thành công",
                new ResetPasswordResponse(user.getId(), rawPassword)
        );
    }

    public BaseResponse<UserListResponse> getAllUsers() {

        List<UserResponse> users = usersRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();

        return BaseResponse.success(
                "Lấy danh sách người dùng thành công",
                new UserListResponse(users)
        );
    }

    public UserDetailResponse getUserDetail(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        UserDetailResponse response = new UserDetailResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole() != null ? user.getRole().getName() : null);
        response.setIsFirstLogin(user.getIsFirstLogin());

        return response;
    }

    public BaseResponse<?> activateUser(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        user.setIsActive(true);
        usersRepository.save(user);

        return BaseResponse.success(
                "Kích hoạt tài khoản thành công",
                null
        );
    }

    public BaseResponse<?> assignRole(UUID userId, Long roleId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Roles role = rolesRepository.findById(roleId.intValue())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò"));

        user.setRole(role);
        usersRepository.save(user);

        return BaseResponse.success(
                "Phân quyền cho người dùng thành công",
                null
        );
    }
}