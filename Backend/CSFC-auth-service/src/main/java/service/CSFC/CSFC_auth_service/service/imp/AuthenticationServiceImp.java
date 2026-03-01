package service.CSFC.CSFC_auth_service.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.common.security.CustomerUserDetails;
import service.CSFC.CSFC_auth_service.mapper.UserMapper;
import service.CSFC.CSFC_auth_service.model.dto.request.*;
import service.CSFC.CSFC_auth_service.model.dto.response.*;
import service.CSFC.CSFC_auth_service.model.entity.Roles;
import service.CSFC.CSFC_auth_service.model.entity.Users;
import service.CSFC.CSFC_auth_service.model.util.PasswordUtil;
import service.CSFC.CSFC_auth_service.repository.RolesRepository;
import service.CSFC.CSFC_auth_service.repository.UsersRepository;
import service.CSFC.CSFC_auth_service.service.AuthenticationService;
import service.CSFC.CSFC_auth_service.service.EmailService;
import service.CSFC.CSFC_auth_service.service.JwtService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {

    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final EmailService emailService;

    // =====================================================
    // USER AUTH
    // =====================================================

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new RuntimeException("User is inactive");
        }

        CustomerUserDetails userDetails = new CustomerUserDetails(user);

        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        user.setRefreshToken(refreshToken);
        usersRepository.save(user);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Roles role = rolesRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Users user = new Users();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAddress(request.getAddress());
        user.setCreateDate(LocalDateTime.now());
        user.setIsActive(true);
        user.setIsFirstLogin(false);
        user.setRole(role);

        usersRepository.save(user);

        return RegisterResponse.builder()
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {

        String refreshToken = request.getRefreshToken();
        String email = jwtService.extractUsername(refreshToken);

        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new RuntimeException("Invalid refresh token");
        }

        CustomerUserDetails userDetails = new CustomerUserDetails(user);

        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new RuntimeException("Refresh token expired or invalid");
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);

        return buildAuthResponse(user, newAccessToken, user.getRefreshToken());
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {

        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String resetToken = jwtService.generatePasswordResetToken(user.getEmail());
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

        emailService.sendEmail(user.getEmail(), resetLink);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {

        String email = jwtService.extractUsername(request.getToken());

        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setRefreshToken(null);

        usersRepository.save(user);
    }

    // =====================================================
    // ADMIN
    // =====================================================

    @Override
    public BaseResponse<ResetPasswordResponse> resetPasswordByAdmin(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String rawPassword = PasswordUtil.generateRandomPassword(10);

        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setIsFirstLogin(true);

        usersRepository.save(user);

        return BaseResponse.success(
                "Reset password successfully",
                new ResetPasswordResponse(user.getId(), rawPassword)
        );
    }

    @Override
    public BaseResponse<?> getAllUsers() {

        List<UserResponse> users = usersRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole() != null ? user.getRole().getName() : null,
                        user.getAddress()
                ))
                .toList();

        return BaseResponse.success(
                "Get all users successfully",
                new UserListResponse(users)
        );
    }

    @Override
    public UserDetailResponse getUserDetailByAdmin(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetailResponse response = new UserDetailResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole() != null ? user.getRole().getName() : null);
        response.setIsFirstLogin(user.getIsFirstLogin());

        return response;
    }

    @Override
    public BaseResponse<?> activateUserByAdmin(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsActive(true);
        usersRepository.save(user);

        return BaseResponse.success("Activate user successfully", null);
    }

    @Override
    public BaseResponse<?> assignRoleByAdmin(UUID userId, Long roleId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Roles role = rolesRepository.findById(roleId.intValue())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        usersRepository.save(user);

        return BaseResponse.success("Assign role successfully", null);
    }

    // =====================================================
    // PRIVATE
    // =====================================================

    private AuthResponse buildAuthResponse(Users user, String accessToken, String refreshToken) {

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(900000L)
                .user(userMapper.toResponse(user))
                .build();
    }
}