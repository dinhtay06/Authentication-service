package service.CSFC.CSFC_auth_service.common.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long accessTokenExpirationMs = 15 * 60 * 1000; // 15 min
    private final long refreshTokenExpirationMs = 7 * 24 * 60 * 60 * 1000; // 7 days

    public String generateAccessToken(String userId, String email, List<String> roles, List<String> permissions) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .claim("roles", roles)
                .claim("permissions", permissions)
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationMs))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> validateToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }

    public String getUserId(String token) {
        return validateToken(token).getBody().getSubject();
    }

    public Map<String, Object> getClaims(String token) {
        return validateToken(token).getBody();
    }
}
