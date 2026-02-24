package service.CSFC.CSFC_auth_service.model.entity;

import service.CSFC.CSFC_auth_service.infrastructure.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class RefreshTokenEntity extends BaseEntity {
    private String token;
    private LocalDateTime expiresAt;
}
