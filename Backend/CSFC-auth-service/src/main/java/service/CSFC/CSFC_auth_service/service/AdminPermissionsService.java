package service.CSFC.CSFC_auth_service.service;

import service.CSFC.CSFC_auth_service.model.dto.response.AdminPermissionsCreateResponse;

public interface AdminPermissionsService {
    void addPermissionToRole(Integer roleId, String permissionName);
}
