package service.CSFC.CSFC_auth_service.common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RefreshTokenRedisService {
    private final RedisTemplate<String, String> redisTemplate;

    public void storeRefreshToken(String token, String userId, long expiresMs) {
        redisTemplate.opsForValue().set(token, userId, Duration.ofMillis(expiresMs));
    }

    public String getUserIdByToken(String token) {
        return redisTemplate.opsForValue().get(token);
    }

    public void revokeRefreshToken(String token) {
        redisTemplate.delete(token);
    }

    public boolean isTokenValid(String token) {
        return redisTemplate.hasKey(token);
    }
}
