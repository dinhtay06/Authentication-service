package service.CSFC.CSFC_auth_service.service.imp;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import service.CSFC.CSFC_auth_service.common.exception.BadRequestException;
import service.CSFC.CSFC_auth_service.common.exception.ResourceNotFoundException;
import service.CSFC.CSFC_auth_service.common.response.BaseResponse;
import service.CSFC.CSFC_auth_service.mapper.UserMapper;
import service.CSFC.CSFC_auth_service.model.dto.response.AuthResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.UserResponse;
import service.CSFC.CSFC_auth_service.model.entity.Users;
import service.CSFC.CSFC_auth_service.repository.UsersRepository;
import service.CSFC.CSFC_auth_service.service.UserService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImp  implements UserService {

    private final UsersRepository usersRepository;
    private final UserMapper userMapper;
    @Override
    public UserResponse getCurrentUser(String email) {
        Users users = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản: " + email));

        return userMapper.toResponse(users);
    }

    @Override
    @Transactional
    public void deActivateUserByAdmin(UUID userId) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));
        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new BadRequestException("Người dùng đã bị vô hiệu hóa");
        }
        user.setIsActive(false);
    }

    @Override
    @Transactional
    public void deleteUserByAdmin(UUID id) {
        Users user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));
        if (Boolean.TRUE.equals(user.getIsActive())) {
            throw new BadRequestException("Phải vô hiệu hóa người dùng trước khi xóa");
        }
        usersRepository.delete(user);
    }
}
