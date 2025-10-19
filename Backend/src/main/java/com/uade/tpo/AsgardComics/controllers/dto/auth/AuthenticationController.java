package com.uade.tpo.AsgardComics.controllers.dto.auth;

import com.uade.tpo.AsgardComics.controllers.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyToken(@RequestBody AuthenticationRequest request) {
        // Verificar token de autenticación
        if (request.getToken() != null && !request.getToken().isEmpty()) {
            return ResponseEntity.ok(ApiResponse.success("Token válido", "authenticated"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Token inválido"));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> refreshToken(@RequestBody AuthenticationRequest request) {
        // Refrescar token de autenticación
        if (request.getToken() != null && !request.getToken().isEmpty()) {
            AuthenticationResponse authResponse = AuthenticationResponse.success(
                "new_jwt_token", 
                "new_refresh_token", 
                3600L
            );
            return ResponseEntity.ok(ApiResponse.success("Token renovado", authResponse));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("No se pudo renovar el token"));
    }
}