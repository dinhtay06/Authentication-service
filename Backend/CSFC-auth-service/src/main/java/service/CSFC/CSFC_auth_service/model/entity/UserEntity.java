package service.CSFC.CSFC_auth_service.model.entity;

import service.CSFC.CSFC_auth_service.infrastructure.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserEntity extends BaseEntity {
    private String email;
    private String password;
    private String fullName;
    private LocalDateTime lastLoginAt;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<RoleEntity> roles;
}
