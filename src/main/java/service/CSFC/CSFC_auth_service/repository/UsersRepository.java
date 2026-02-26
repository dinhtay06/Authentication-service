package service.CSFC.CSFC_auth_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import service.CSFC.CSFC_auth_service.model.entity.Users;

import java.util.Optional;

@Repository
public interface UsersRepository  extends JpaRepository<Users, Long> {
      Optional<Users> findByEmail(String username);
      boolean existsByEmail(String email);
}
