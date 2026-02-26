package service.CSFC.CSFC_auth_service.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity(name = "roles")
public class Roles {
    @Id
    private int id;
    private String name;
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "role")
    private List<Users> users;
}
