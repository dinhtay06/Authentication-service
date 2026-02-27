package service.CSFC.CSFC_auth_service.model.entity;

import service.CSFC.CSFC_auth_service.infrastructure.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "login_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class LoginAttemptEntity extends BaseEntity {
    private String ipAddress;
    private LocalDateTime attemptedAt;
}
