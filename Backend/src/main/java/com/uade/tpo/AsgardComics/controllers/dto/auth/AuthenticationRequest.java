package com.uade.tpo.AsgardComics.controllers.dto.auth;

import jakarta.validation.constraints.NotBlank;

public class AuthenticationRequest {
    
    @NotBlank(message = "El token es requerido")
    private String token;
    
    private String refreshToken;
    
    // Constructors
    public AuthenticationRequest() {}
    
    public AuthenticationRequest(String token) {
        this.token = token;
    }
    
    public AuthenticationRequest(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getRefreshToken() {
        return refreshToken;
    }
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}