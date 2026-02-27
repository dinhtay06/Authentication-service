package service.CSFC.CSFC_auth_service.model.entity;

import service.CSFC.CSFC_auth_service.infrastructure.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PermissionEntity extends BaseEntity {
    private String name;
}
