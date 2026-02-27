package service.CSFC.CSFC_auth_service.common.exception;

import java.time.Instant;
import java.util.Map;

public record ErrorResponse(
        String code,
        String message,
        String error,
        String path,
        Instant timestamp,
        int status,
        Map<String, String> fieldErrors
) {
}
