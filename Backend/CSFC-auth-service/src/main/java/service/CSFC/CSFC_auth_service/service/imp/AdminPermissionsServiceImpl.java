package service.CSFC.CSFC_auth_service.service.imp;

import lombok.*;
import org.springframework.stereotype.*;
import service.CSFC.CSFC_auth_service.model.dto.response.AdminPermissionsCreateResponse;
import service.CSFC.CSFC_auth_service.model.entity.Permission;
import service.CSFC.CSFC_auth_service.model.entity.Roles;
import service.CSFC.CSFC_auth_service.repository.PermissionsRepository;
import service.CSFC.CSFC_auth_service.repository.RolesRepository;
import service.CSFC.CSFC_auth_service.service.AdminPermissionsService;
@Service
@RequiredArgsConstructor
public class AdminPermissionsServiceImpl implements AdminPermissionsService {

    private final RolesRepository rolesRepository;
    private final PermissionsRepository permissionsRepository;

    @Override
    public void addPermissionToRole(Integer roleId, String permissionName) {

        Roles role = rolesRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));

        Permission permission = permissionsRepository.findByName(permissionName)
                .orElseThrow(() -> new RuntimeException("Permission không tồn tại"));

        if (role.getPermissions().contains(permission)) {
            throw new RuntimeException("Permission đã tồn tại trong role");
        }
        role.getPermissions().add(permission);

        rolesRepository.save(role);
    }
}
